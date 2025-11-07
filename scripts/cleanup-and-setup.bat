@echo off
echo ========================================
echo   NICE-CV - Migration vers MongoDB
echo ========================================
echo.

echo [1/5] Suppression des dependances Supabase...
call npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared @supabase/ssr
echo.

echo [2/5] Installation des dependances...
call npm install
echo.

echo [3/5] Generation du client Prisma...
call npx prisma generate
echo.

echo [4/5] Creation des collections MongoDB...
echo ATTENTION: Assurez-vous d'avoir configure DATABASE_URL dans .env.local
echo Appuyez sur une touche pour continuer ou Ctrl+C pour annuler...
pause > nul
call npx prisma db push
echo.

echo [5/5] Test de la connexion...
call npm run test:db
echo.

echo ========================================
echo   Migration terminee !
echo ========================================
echo.
echo Prochaines etapes:
echo 1. Verifiez que le test de connexion a reussi
echo 2. Lancez: npm run dev
echo 3. Ouvrez: http://localhost:3000
echo.
pause
