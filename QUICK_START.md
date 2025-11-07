# 🚀 Quick Start - Nouvelle Architecture NICE-CV

## 📦 Ce qui a été créé

### ✅ Structure de Dossiers
```
✓ components/ui/          - Composants UI réutilisables
✓ components/layout/      - Composants de layout
✓ components/shared/      - Composants partagés
✓ features/auth/          - Module authentification
✓ features/cv/            - Module CV
✓ features/payment/       - Module paiement
✓ features/landing/       - Module landing page
✓ features/dashboard/     - Module dashboard
✓ config/                 - Configuration centralisée
✓ hooks/                  - Hooks globaux
✓ styles/themes/          - Thèmes personnalisés
```

### ✅ Fichiers Créés

#### Configuration
- `config/site.ts` - Configuration du site
- `config/constants.ts` - Constantes globales
- `config/themes.ts` - Thèmes disponibles

#### Types
- `features/cv/types/cv.types.ts` - Types pour les CV

#### Utilitaires
- `lib/utils/cn.ts` - Fusion de classes Tailwind
- `lib/utils/date.ts` - Formatage de dates
- `lib/utils/validation.ts` - Validation de données

#### Composants UI
- `components/ui/Button.tsx` - Bouton réutilisable
- `components/ui/Input.tsx` - Input réutilisable
- `components/ui/Card.tsx` - Carte réutilisable
- `components/shared/LoadingSpinner.tsx` - Spinner de chargement

#### Documentation
- `ARCHITECTURE.md` - Documentation complète de l'architecture
- `MIGRATION_GUIDE.md` - Guide de migration pas à pas
- `NEW_ARCHITECTURE_README.md` - Guide d'utilisation
- `QUICK_START.md` - Ce fichier

## 🎯 Prochaines Étapes

### 1. Tester les Nouveaux Composants

Crée une page de test pour voir les composants:

```typescript
// app/test-components/page.tsx
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function TestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Test des Composants</h1>
      
      {/* Buttons */}
      <Card>
        <h2 className="text-xl font-bold text-white mb-4">Buttons</h2>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>

      {/* Inputs */}
      <Card>
        <h2 className="text-xl font-bold text-white mb-4">Inputs</h2>
        <div className="space-y-4">
          <Input label="Email" placeholder="votre@email.com" />
          <Input label="Mot de passe" type="password" />
          <Input label="Avec erreur" error="Ce champ est requis" />
        </div>
      </Card>

      {/* Loading */}
      <Card>
        <h2 className="text-xl font-bold text-white mb-4">Loading</h2>
        <LoadingSpinner size="lg" text="Chargement..." />
      </Card>
    </div>
  );
}
```

### 2. Commencer la Migration

Suis le guide dans `MIGRATION_GUIDE.md`:

1. **Phase 1**: Configuration ✅ (FAIT)
2. **Phase 2**: Composants UI (EN COURS)
3. **Phase 3**: Features (À FAIRE)
4. **Phase 4**: Nettoyage (À FAIRE)

### 3. Utiliser les Nouveaux Composants

#### Exemple: Remplacer un bouton
```typescript
// ❌ Avant
<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg">
  Créer un CV
</button>

// ✅ Après
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg">
  Créer un CV
</Button>
```

#### Exemple: Utiliser les types
```typescript
// ❌ Avant
import { PersonalDetails } from "@/type";

// ✅ Après
import { PersonalDetails } from "@/features/cv/types/cv.types";
```

#### Exemple: Utiliser les utilitaires
```typescript
// ❌ Avant
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
}

// ✅ Après
import { formatDate } from "@/lib/utils/date";

const formatted = formatDate("2024-01-15");
```

## 📚 Documentation

### Lire en Premier
1. **ARCHITECTURE.md** - Comprendre l'architecture globale
2. **NEW_ARCHITECTURE_README.md** - Apprendre à utiliser la nouvelle structure
3. **MIGRATION_GUIDE.md** - Suivre le plan de migration

### Références Rapides

#### Imports Courants
```typescript
// Composants UI
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

// Composants Partagés
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

// Types
import { CVData, PersonalDetails } from "@/features/cv/types/cv.types";

// Utilitaires
import { formatDate } from "@/lib/utils/date";
import { isValidEmail } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";

// Configuration
import { siteConfig } from "@/config/site";
import { MAX_CV_FREE } from "@/config/constants";
import { themes } from "@/config/themes";
```

#### Structure d'un Composant
```typescript
import React from "react";
import { Button } from "@/components/ui/Button";

interface MyComponentProps {
  title: string;
  onSave: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onSave }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await onSave();
    setIsLoading(false);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleSave} isLoading={isLoading}>
        Sauvegarder
      </Button>
    </div>
  );
};
```

## 🎨 Exemples d'Utilisation

### Créer un Formulaire
```typescript
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Lock } from "lucide-react";

export const LoginForm = () => {
  return (
    <Card variant="glass">
      <form className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="votre@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-5 w-5" />}
        />
        <Button variant="primary" size="lg" className="w-full">
          Se connecter
        </Button>
      </form>
    </Card>
  );
};
```

### Créer une Liste de CV
```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CVData } from "@/features/cv/types/cv.types";
import { formatDate } from "@/lib/utils/date";

interface CVListProps {
  cvs: CVData[];
}

export const CVList: React.FC<CVListProps> = ({ cvs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cvs.map((cv) => (
        <Card key={cv.id} hover>
          <CardHeader>
            <CardTitle>{cv.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm">
              Créé le {formatDate(cv.createdAt!)}
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                Éditer
              </Button>
              <Button variant="ghost" size="sm">
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
```

## 🔧 Commandes Utiles

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Vérifier les types TypeScript
npm run type-check

# Linter
npm run lint
```

## 💡 Conseils

1. **Commence petit**: Migre un composant à la fois
2. **Teste souvent**: Vérifie que tout fonctionne après chaque changement
3. **Utilise les types**: TypeScript t'aidera à éviter les erreurs
4. **Réutilise**: Utilise les composants UI au lieu de recréer
5. **Documente**: Ajoute des commentaires pour les parties complexes

## 🆘 Besoin d'Aide?

- Consulte `ARCHITECTURE.md` pour la vue d'ensemble
- Consulte `MIGRATION_GUIDE.md` pour le plan de migration
- Consulte `NEW_ARCHITECTURE_README.md` pour les exemples d'utilisation
- Regarde les composants existants pour des exemples

## ✅ Checklist de Démarrage

- [ ] Lire `ARCHITECTURE.md`
- [ ] Lire `NEW_ARCHITECTURE_README.md`
- [ ] Créer une page de test des composants
- [ ] Tester les composants UI
- [ ] Commencer la migration d'un petit composant
- [ ] Lire `MIGRATION_GUIDE.md` pour la suite

---

**Félicitations! Tu as maintenant une architecture solide pour ton projet NICE-CV! 🎉**
