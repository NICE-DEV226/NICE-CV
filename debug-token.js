const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Collez votre token ici (depuis localStorage dans le navigateur)
const token = "COLLEZ_VOTRE_TOKEN_ICI";

try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('\n✅ Token valide!\n');
  console.log('Données du token:');
  console.log(JSON.stringify(decoded, null, 2));
  console.log('\nUserId:', decoded.userId);
  console.log('Email:', decoded.email);
} catch (error) {
  console.error('\n❌ Token invalide:', error.message);
}
