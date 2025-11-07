#!/bin/bash

echo "========================================"
echo "  NICE-CV - Migration vers MongoDB"
echo "========================================"
echo ""

echo "[1/5] Suppression des dépendances Supabase..."
npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared @supabase/ssr
echo ""

echo "[2/5] Installation des dépendances..."
npm install
echo ""

echo "[3/5] Génération du client Prisma..."
npx prisma generate
echo ""

echo "[4/5] Création des collections MongoDB..."
echo "ATTENTION: Assurez-vous d'avoir configuré DATABASE_URL dans .env.local"
read -p "Appuyez sur Entrée pour continuer ou Ctrl+C pour annuler..."
npx prisma db push
echo ""

echo "[5/5] Test de la connexion..."
npm run test:db
echo ""

echo "========================================"
echo "  Migration terminée !"
echo "========================================"
echo ""
echo "Prochaines étapes:"
echo "1. Vérifiez que le test de connexion a réussi"
echo "2. Lancez: npm run dev"
echo "3. Ouvrez: http://localhost:3000"
echo ""
