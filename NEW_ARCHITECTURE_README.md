# 🏗️ Nouvelle Architecture NICE-CV

## 📖 Vue d'Ensemble

Cette nouvelle architecture améliore considérablement l'organisation du code pour:
- ✅ **Meilleure maintenabilité**
- ✅ **Scalabilité accrue**
- ✅ **Réutilisabilité des composants**
- ✅ **Séparation des responsabilités**
- ✅ **Expérience développeur optimale**

## 🎯 Principes Clés

### 1. Feature-Based Organization
Chaque fonctionnalité est autonome avec ses propres composants, hooks, services et types.

```
features/
├── auth/          # Tout ce qui concerne l'authentification
├── cv/            # Tout ce qui concerne les CV
├── payment/       # Tout ce qui concerne les paiements
├── landing/       # Tout ce qui concerne la landing page
└── dashboard/     # Tout ce qui concerne le dashboard
```

### 2. Composants Réutilisables
Les composants UI sont centralisés et réutilisables partout.

```
components/
├── ui/            # Composants UI de base (Button, Input, Card...)
├── layout/        # Composants de layout (Header, Footer...)
└── shared/        # Composants partagés (LoadingSpinner...)
```

### 3. Configuration Centralisée
Toute la configuration est centralisée pour faciliter les modifications.

```
config/
├── site.ts        # Configuration du site
├── constants.ts   # Constantes globales
└── themes.ts      # Thèmes disponibles
```

## 📁 Structure Détaillée

### Features

#### 🔐 Auth Feature
```
features/auth/
├── components/
│   ├── LoginForm.tsx       # Formulaire de connexion
│   ├── RegisterForm.tsx    # Formulaire d'inscription
│   └── SocialAuth.tsx      # Authentification sociale
├── hooks/
│   └── useAuth.ts          # Hook personnalisé pour l'auth
└── utils/
    └── validation.ts       # Validation des formulaires
```

#### 📄 CV Feature
```
features/cv/
├── components/
│   ├── CVEditor/           # Éditeur de CV
│   │   ├── PersonalDetailsForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   └── ...
│   ├── CVPreview/          # Prévisualisation
│   │   ├── CVPreview.tsx
│   │   └── templates/      # Templates de CV
│   ├── CVList/             # Liste des CV
│   └── CVExport/           # Export PDF
├── hooks/
│   ├── useCVs.ts           # Gestion des CV
│   ├── useCVEditor.ts      # Logique de l'éditeur
│   └── usePDFExport.ts     # Export PDF
├── services/
│   └── cvService.ts        # API calls pour les CV
└── types/
    └── cv.types.ts         # Types TypeScript
```

#### 💳 Payment Feature
```
features/payment/
├── components/
│   ├── PricingCard.tsx     # Carte de tarification
│   ├── CheckoutForm.tsx    # Formulaire de paiement
│   └── UpgradeModal.tsx    # Modal d'upgrade
├── hooks/
│   └── usePayment.ts       # Logique de paiement
└── services/
    └── stripeService.ts    # Intégration Stripe
```

#### 🏠 Landing Feature
```
features/landing/
├── components/
│   ├── Hero.tsx            # Section hero
│   ├── Features.tsx        # Section fonctionnalités
│   ├── Pricing.tsx         # Section tarifs
│   ├── Testimonials.tsx    # Témoignages
│   ├── CTA.tsx             # Call-to-action
│   └── Stats.tsx           # Statistiques
└── animations/
    └── landingAnimations.ts # Animations Framer Motion
```

#### 📊 Dashboard Feature
```
features/dashboard/
├── components/
│   ├── DashboardHeader.tsx # En-tête du dashboard
│   ├── StatsCards.tsx      # Cartes de statistiques
│   ├── QuickActions.tsx    # Actions rapides
│   └── UpgradeBanner.tsx   # Bannière d'upgrade
└── hooks/
    └── useDashboard.ts     # Logique du dashboard
```

### Composants UI

```
components/ui/
├── Button.tsx              # Bouton réutilisable
├── Input.tsx               # Input réutilisable
├── Card.tsx                # Carte réutilisable
├── Modal.tsx               # Modal réutilisable
└── Badge.tsx               # Badge réutilisable
```

### Utilitaires

```
lib/utils/
├── cn.ts                   # Fusion de classes Tailwind
├── date.ts                 # Formatage de dates
└── validation.ts           # Validation de données
```

## 🚀 Utilisation

### Importer un Composant UI
```typescript
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

<Button variant="primary" size="lg">
  Créer un CV
</Button>
```

### Utiliser un Hook Personnalisé
```typescript
import { useCVEditor } from "@/features/cv/hooks/useCVEditor";

const { cv, updateCV, saveCV, isLoading } = useCVEditor(cvId);
```

### Utiliser les Types
```typescript
import { CVData, PersonalDetails } from "@/features/cv/types/cv.types";

const cv: CVData = {
  title: "Mon CV",
  personalDetails: { ... },
  experiences: [ ... ],
  // ...
};
```

### Utiliser la Configuration
```typescript
import { siteConfig, features } from "@/config/site";
import { MAX_CV_FREE, MESSAGES } from "@/config/constants";

console.log(siteConfig.name); // "NICE-CV"
console.log(features.freeCV); // 3
console.log(MAX_CV_FREE); // 3
```

### Utiliser les Utilitaires
```typescript
import { formatDate } from "@/lib/utils/date";
import { isValidEmail } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";

const formattedDate = formatDate("2024-01-15"); // "15 jan. 2024"
const isValid = isValidEmail("test@example.com"); // true
const classes = cn("btn", "btn-primary", isActive && "active");
```

## 💡 Avantages

### Avant (Ancienne Architecture)
```typescript
// ❌ Fichiers éparpillés
app/components/CVPreview.tsx
app/components/ExperienceForm.tsx
app/landing-final.tsx
app/page-part2.tsx
type.ts
presets.ts

// ❌ Imports confus
import { PersonalDetails } from "@/type";
import CVPreview from "@/app/components/CVPreview";
```

### Après (Nouvelle Architecture)
```typescript
// ✅ Organisation claire
features/cv/components/CVPreview/CVPreview.tsx
features/cv/components/CVEditor/ExperienceForm.tsx
features/landing/components/Hero.tsx
features/cv/types/cv.types.ts

// ✅ Imports clairs
import { PersonalDetails } from "@/features/cv/types/cv.types";
import { CVPreview } from "@/features/cv/components/CVPreview";
import { Button } from "@/components/ui/Button";
```

## 📊 Comparaison

| Aspect | Avant | Après |
|--------|-------|-------|
| **Organisation** | Par type de fichier | Par fonctionnalité |
| **Réutilisabilité** | Faible | Élevée |
| **Maintenabilité** | Difficile | Facile |
| **Scalabilité** | Limitée | Excellente |
| **Imports** | Confus | Clairs |
| **Tests** | Difficiles | Faciles |

## 🎓 Bonnes Pratiques

### 1. Nommage
- **Composants**: PascalCase (`CVEditor.tsx`)
- **Hooks**: camelCase avec `use` (`useCVEditor.ts`)
- **Services**: camelCase avec `Service` (`cvService.ts`)
- **Types**: PascalCase (`CVData`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_CV_FREE`)

### 2. Imports
```typescript
// ✅ Bon
import { Button } from "@/components/ui/Button";
import { useCVEditor } from "@/features/cv/hooks/useCVEditor";
import { CVData } from "@/features/cv/types/cv.types";

// ❌ Mauvais
import Button from "../../../components/ui/Button";
import { useCVEditor } from "../../hooks/useCVEditor";
```

### 3. Structure de Composant
```typescript
// 1. Imports
import React from "react";
import { Button } from "@/components/ui/Button";

// 2. Types
interface MyComponentProps {
  title: string;
}

// 3. Composant
export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => { ... };
  
  // 6. Render
  return <div>...</div>;
};
```

## 🔗 Ressources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Documentation complète
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guide de migration
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## 🤝 Contribution

Pour contribuer à cette architecture:
1. Suivre les conventions de nommage
2. Respecter la structure des dossiers
3. Documenter les nouveaux composants
4. Tester avant de commit
5. Mettre à jour cette documentation si nécessaire

---

**Cette architecture est conçue pour évoluer avec le projet. N'hésite pas à l'adapter selon tes besoins!** 🚀
