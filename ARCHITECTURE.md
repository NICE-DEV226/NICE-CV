# 🏗️ Architecture NICE-CV - Documentation

## 📁 Structure du Projet

```
nice-cv/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Groupe de routes authentification
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/              # Groupe de routes dashboard (protégé)
│   │   ├── dashboard/
│   │   ├── create/
│   │   └── edit/[id]/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── cv/
│   │   ├── payment/
│   │   └── user/
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page
│   └── providers.tsx
│
├── components/                   # Composants réutilisables
│   ├── ui/                       # Composants UI de base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── layout/                   # Composants de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   └── shared/                   # Composants partagés
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── SEO.tsx
│
├── features/                     # Features organisées par domaine
│   ├── auth/                     # Authentification
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── SocialAuth.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── utils/
│   │       └── validation.ts
│   │
│   ├── cv/                       # Gestion des CV
│   │   ├── components/
│   │   │   ├── CVEditor/
│   │   │   │   ├── CVEditor.tsx
│   │   │   │   ├── PersonalDetailsForm.tsx
│   │   │   │   ├── ExperienceForm.tsx
│   │   │   │   ├── EducationForm.tsx
│   │   │   │   ├── SkillForm.tsx
│   │   │   │   ├── LanguageForm.tsx
│   │   │   │   └── HobbyForm.tsx
│   │   │   ├── CVPreview/
│   │   │   │   ├── CVPreview.tsx
│   │   │   │   ├── templates/
│   │   │   │   │   ├── ClassicTemplate.tsx
│   │   │   │   │   ├── ModernTemplate.tsx
│   │   │   │   │   └── PremiumTemplate.tsx
│   │   │   │   └── ThemeSelector.tsx
│   │   │   ├── CVList/
│   │   │   │   ├── CVList.tsx
│   │   │   │   ├── CVCard.tsx
│   │   │   │   └── CVActions.tsx
│   │   │   └── CVExport/
│   │   │       └── PDFExporter.tsx
│   │   ├── hooks/
│   │   │   ├── useCVs.ts
│   │   │   ├── useCVEditor.ts
│   │   │   └── usePDFExport.ts
│   │   ├── services/
│   │   │   └── cvService.ts
│   │   └── types/
│   │       └── cv.types.ts
│   │
│   ├── payment/                  # Système de paiement
│   │   ├── components/
│   │   │   ├── PricingCard.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── UpgradeModal.tsx
│   │   ├── hooks/
│   │   │   └── usePayment.ts
│   │   └── services/
│   │       └── stripeService.ts
│   │
│   ├── landing/                  # Page d'accueil
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Stats.tsx
│   │   └── animations/
│   │       └── landingAnimations.ts
│   │
│   └── dashboard/                # Dashboard
│       ├── components/
│       │   ├── DashboardHeader.tsx
│       │   ├── StatsCards.tsx
│       │   ├── QuickActions.tsx
│       │   └── UpgradeBanner.tsx
│       └── hooks/
│           └── useDashboard.ts
│
├── lib/                          # Utilitaires et configurations
│   ├── auth.ts                   # Configuration NextAuth
│   ├── prisma.ts                 # Client Prisma
│   ├── supabase.ts               # Client Supabase
│   ├── stripe.ts                 # Configuration Stripe
│   └── utils/
│       ├── cn.ts                 # Utilitaire classnames
│       ├── date.ts               # Formatage dates
│       └── validation.ts         # Schémas de validation
│
├── hooks/                        # Hooks globaux
│   ├── useSession.ts
│   ├── useToast.ts
│   └── useMediaQuery.ts
│
├── types/                        # Types TypeScript globaux
│   ├── index.ts
│   ├── next-auth.d.ts
│   └── database.types.ts
│
├── config/                       # Configuration
│   ├── site.ts                   # Configuration du site
│   ├── themes.ts                 # Thèmes disponibles
│   └── constants.ts              # Constantes
│
├── styles/                       # Styles globaux
│   ├── globals.css
│   └── themes/
│       ├── nice-theme.css
│       └── nice-dark.css
│
├── prisma/                       # Base de données
│   ├── schema.prisma
│   └── migrations/
│
├── public/                       # Assets statiques
│   ├── images/
│   ├── icons/
│   └── templates/
│
└── scripts/                      # Scripts utilitaires
    ├── seed.ts
    └── migrate.ts
```

## 🎯 Principes d'Architecture

### 1. **Feature-Based Organization**
Chaque feature est autonome avec ses propres:
- Composants
- Hooks
- Services
- Types
- Tests

### 2. **Separation of Concerns**
- `components/` : Composants UI réutilisables
- `features/` : Logique métier par domaine
- `lib/` : Utilitaires et configurations
- `hooks/` : Hooks React globaux
- `types/` : Types TypeScript partagés

### 3. **Component Hierarchy**
```
Page Component (app/)
  ↓
Feature Component (features/)
  ↓
UI Component (components/ui/)
```

### 4. **Data Flow**
```
API Route → Service → Hook → Component
```

## 📦 Modules Principaux

### Auth Module
- Authentification avec NextAuth
- Support Google OAuth
- Gestion des sessions
- Protection des routes

### CV Module
- Éditeur de CV interactif
- Prévisualisation en temps réel
- Export PDF haute qualité
- Gestion des templates
- Système de thèmes

### Payment Module
- Intégration Stripe
- Gestion des abonnements
- Système freemium
- Historique des paiements

### Dashboard Module
- Vue d'ensemble des CV
- Statistiques utilisateur
- Actions rapides
- Gestion du profil

## 🔧 Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Payment**: Stripe
- **Animations**: Framer Motion
- **PDF**: jsPDF + html2canvas

## 🚀 Avantages de cette Architecture

1. **Scalabilité**: Facile d'ajouter de nouvelles features
2. **Maintenabilité**: Code organisé et facile à comprendre
3. **Réutilisabilité**: Composants et hooks partagés
4. **Testabilité**: Chaque module peut être testé indépendamment
5. **Performance**: Code splitting automatique par feature
6. **DX**: Meilleure expérience développeur

## 📝 Conventions de Nommage

- **Composants**: PascalCase (`CVEditor.tsx`)
- **Hooks**: camelCase avec préfixe `use` (`useCVEditor.ts`)
- **Services**: camelCase avec suffixe `Service` (`cvService.ts`)
- **Types**: PascalCase (`CVData`, `UserProfile`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_CV_FREE`)
- **Fichiers**: kebab-case pour les utilitaires (`format-date.ts`)

## 🔐 Sécurité

- Variables d'environnement pour les secrets
- Validation côté serveur et client
- Protection CSRF
- Rate limiting sur les API
- Sanitization des inputs
- Headers de sécurité (CSP, HSTS)

## 🎨 Thèmes et Styles

- Système de thèmes avec DaisyUI
- Variables CSS personnalisées
- Support dark mode
- Responsive design
- Animations performantes

## 📊 État de l'Application

- **Global State**: React Context (Auth, Theme)
- **Server State**: React Query / SWR
- **Form State**: React Hook Form
- **URL State**: Next.js Router

## 🧪 Tests (À implémenter)

```
tests/
├── unit/           # Tests unitaires
├── integration/    # Tests d'intégration
└── e2e/           # Tests end-to-end
```

## 📈 Performance

- Code splitting par route
- Lazy loading des composants
- Image optimization (Next.js Image)
- Bundle analysis
- Caching stratégique
- Compression gzip/brotli

## 🔄 Migration depuis l'ancienne structure

1. Déplacer les composants vers `features/`
2. Créer les hooks personnalisés
3. Extraire la logique métier dans les services
4. Organiser les types
5. Nettoyer les fichiers dupliqués
6. Mettre à jour les imports

---

**Note**: Cette architecture est évolutive et peut être adaptée selon les besoins du projet.
