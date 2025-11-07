#!/usr/bin/env node

/**
 * 🧪 NICE-CV Supabase Connection Test Script
 *
 * This script tests the connection to Supabase database independently
 * from the Next.js application to diagnose connection issues.
 *
 * Usage: node scripts/test-supabase-connection.js
 */

const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  console.log('\n' + '='.repeat(60));
  log('cyan', `🚀 ${message}`);
  console.log('='.repeat(60));
}

function success(message) {
  log('green', `✅ ${message}`);
}

function error(message) {
  log('red', `❌ ${message}`);
}

function warning(message) {
  log('yellow', `⚠️  ${message}`);
}

function info(message) {
  log('blue', `ℹ️  ${message}`);
}

async function testEnvironmentVariables() {
  header('Environment Variables Check');

  const requiredVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  let allPresent = true;

  for (const varName of requiredVars) {
    if (process.env[varName]) {
      success(`${varName}: ✓ Present`);
      if (varName.includes('KEY') || varName.includes('URL')) {
        const value = process.env[varName];
        info(`  Value: ${value.substring(0, 20)}...${value.substring(value.length - 10)}`);
      }
    } else {
      error(`${varName}: ✗ Missing`);
      allPresent = false;
    }
  }

  return allPresent;
}

async function testDirectDatabaseConnection() {
  header('Direct PostgreSQL Connection Test');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    error('DATABASE_URL not found in environment variables');
    return false;
  }

  info(`Testing connection to: ${databaseUrl.replace(/:([^:@]+)@/, ':***@')}`);

  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    info('Attempting to connect...');
    await client.connect();
    success('Connected to PostgreSQL database successfully!');

    info('Testing basic query...');
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    success(`Database time: ${result.rows[0].current_time}`);
    info(`PostgreSQL version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);

    info('Testing tables existence...');
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    if (tablesResult.rows.length > 0) {
      success(`Found ${tablesResult.rows.length} tables:`);
      tablesResult.rows.forEach(row => {
        info(`  - ${row.table_name}`);
      });
    } else {
      warning('No tables found in public schema');
    }

    return true;
  } catch (err) {
    error(`PostgreSQL connection failed: ${err.message}`);

    if (err.message.includes('ENOTFOUND') || err.message.includes('ECONNREFUSED')) {
      warning('This looks like a network connectivity issue');
      warning('Possible causes:');
      warning('  - Supabase project is paused');
      warning('  - Firewall blocking the connection');
      warning('  - Incorrect hostname in DATABASE_URL');
    } else if (err.message.includes('password authentication failed')) {
      warning('This looks like an authentication issue');
      warning('  - Check your database password in DATABASE_URL');
    }

    return false;
  } finally {
    try {
      await client.end();
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

async function testSupabaseClient() {
  header('Supabase Client Test');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    error('Supabase URL or key missing from environment variables');
    return false;
  }

  info(`Testing Supabase client connection to: ${supabaseUrl}`);

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    info('Testing connection with a simple query...');
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      if (error.code === 'PGRST116') {
        success('Connected to Supabase! (Table is empty, which is normal)');
        info(`User table exists but contains no rows`);
        return true;
      } else if (error.message.includes('relation "users" does not exist')) {
        warning('Connected to Supabase but "users" table does not exist');
        warning('You need to run the SQL initialization script');
        return true; // Connection works, just missing schema
      } else {
        error(`Supabase query error: ${error.message}`);
        error(`Error code: ${error.code}`);
        return false;
      }
    } else {
      success(`Connected to Supabase successfully!`);
      info(`Found ${count || 0} users in the database`);
      return true;
    }
  } catch (err) {
    error(`Supabase client error: ${err.message}`);
    return false;
  }
}

async function testSupabaseService() {
  header('Supabase Service Role Test');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    warning('Supabase service role key not found, skipping service test');
    return true;
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey);

    info('Testing service role permissions...');
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    if (error && error.message.includes('relation "users" does not exist')) {
      warning('Service role works but schema not initialized');
      return true;
    } else if (error) {
      error(`Service role error: ${error.message}`);
      return false;
    } else {
      success('Service role working correctly!');
      return true;
    }
  } catch (err) {
    error(`Service role test error: ${err.message}`);
    return false;
  }
}

async function checkSupabaseProject() {
  header('Supabase Project Health Check');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    error('NEXT_PUBLIC_SUPABASE_URL not found');
    return false;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });

    if (response.ok) {
      success('Supabase REST API is responding');
      const contentType = response.headers.get('content-type');
      info(`API Response: ${response.status} ${response.statusText}`);
      info(`Content-Type: ${contentType}`);
      return true;
    } else if (response.status === 401) {
      error('Unauthorized - Check your API keys');
      return false;
    } else {
      error(`Supabase API returned: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (err) {
    if (err.message.includes('fetch is not defined')) {
      warning('Fetch not available in Node.js version, skipping API test');
      return true;
    }
    error(`Failed to reach Supabase API: ${err.message}`);
    return false;
  }
}

async function generateReport(results) {
  header('Connection Test Report');

  console.log('\n📊 Test Results Summary:');
  console.log('┌─────────────────────────────────┬──────────┐');
  console.log('│ Test                            │ Status   │');
  console.log('├─────────────────────────────────┼──────────┤');

  for (const [test, passed] of Object.entries(results)) {
    const status = passed ? colors.green + '✅ PASS' + colors.reset : colors.red + '❌ FAIL' + colors.reset;
    const testName = test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    console.log(`│ ${testName.padEnd(31)} │ ${status}    │`);
  }
  console.log('└─────────────────────────────────┴──────────┘');

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;

  console.log(`\n📈 Overall: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    success('\n🎉 All tests passed! Your Supabase connection is working correctly.');
  } else if (passedTests > 0) {
    warning('\n⚠️  Some tests failed. Check the errors above for troubleshooting.');
  } else {
    error('\n💥 All tests failed. There might be a fundamental configuration issue.');
  }

  console.log('\n💡 Troubleshooting tips:');
  if (!results.environmentVariables) {
    console.log('  • Make sure your .env.local file exists and contains all required variables');
  }
  if (!results.directDatabase) {
    console.log('  • Check if your Supabase project is active (not paused)');
    console.log('  • Verify your DATABASE_URL contains the correct password');
  }
  if (!results.supabaseClient && results.directDatabase) {
    console.log('  • Run the SQL initialization script in your Supabase dashboard');
  }
}

async function main() {
  console.log(colors.bright + colors.magenta);
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    NICE-CV Database Test                     ║');
  console.log('║                  Supabase Connection Tester                  ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  const results = {};

  try {
    // Test 1: Environment Variables
    results.environmentVariables = await testEnvironmentVariables();

    if (!results.environmentVariables) {
      error('Cannot continue without environment variables. Please check your .env.local file.');
      process.exit(1);
    }

    // Test 2: Direct Database Connection
    results.directDatabase = await testDirectDatabaseConnection();

    // Test 3: Supabase Client
    results.supabaseClient = await testSupabaseClient();

    // Test 4: Supabase Service Role
    results.supabaseService = await testSupabaseService();

    // Test 5: Supabase Project Health
    results.projectHealth = await checkSupabaseProject();

    // Generate final report
    await generateReport(results);

  } catch (err) {
    error(`Unexpected error during testing: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }

  process.exit(0);
}

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  error(`Uncaught exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  error(`Unhandled rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Run the tests
main();
