# 📦 Guide de Migration - NICE-CV

Ce guide explique comment migrer progressivement vers la nouvelle architecture sans casser l'application existante.

## 🎯 Stratégie de Migration

La migration se fera en **3 phases** pour minimiser les risques:

### Phase 1: Préparation (Sans impact)
✅ Créer la nouvelle structure de dossiers
✅ Créer les fichiers de configuration
✅ Créer les composants UI réutilisables
✅ Créer les utilitaires et types

### Phase 2: Migration Progressive (Module par module)
🔄 Migrer les composants vers features/
🔄 Créer les hooks personnalisés
🔄 Extraire la logique métier
🔄 Mettre à jour les imports progressivement

### Phase 3: Nettoyage
🧹 Supprimer les fichiers dupliqués
🧹 Nettoyer les imports inutilisés
🧹 Optimiser le code

## 📋 Checklist de Migration

### ✅ Étape 1: Configuration (FAIT)
- [x] Créer `config/site.ts`
- [x] Créer `config/constants.ts`
- [x] Créer `config/themes.ts`
- [x] Créer les utilitaires dans `lib/utils/`
- [x] Créer les types dans `features/cv/types/`

### 🔄 Étape 2: Composants UI (EN COURS)
- [x] Créer `components/ui/Button.tsx`
- [x] Créer `components/ui/Input.tsx`
- [x] Créer `components/ui/Card.tsx`
- [x] Créer `components/shared/LoadingSpinner.tsx`
- [ ] Créer `components/ui/Modal.tsx`
- [ ] Créer `components/ui/Badge.tsx`
- [ ] Créer `components/layout/Header.tsx`
- [ ] Créer `components/layout/Footer.tsx`

### 📝 Étape 3: Feature CV
- [ ] Déplacer `CVPreview.tsx` vers `features/cv/components/CVPreview/`
- [ ] Déplacer les formulaires vers `features/cv/components/CVEditor/`
- [ ] Créer `features/cv/hooks/useCVEditor.ts`
- [ ] Créer `features/cv/services/cvService.ts`
- [ ] Mettre à jour les imports

### 🔐 Étape 4: Feature Auth
- [ ] Déplacer les pages auth vers `features/auth/components/`
- [ ] Créer `features/auth/hooks/useAuth.ts`
- [ ] Créer `features/auth/utils/validation.ts`
- [ ] Mettre à jour les imports

### 🏠 Étape 5: Feature Landing
- [ ] Extraire les sections de `page.tsx` vers `features/landing/components/`
- [ ] Créer `Hero.tsx`, `Features.tsx`, `Pricing.tsx`, etc.
- [ ] Créer `features/landing/animations/`
- [ ] Mettre à jour `app/page.tsx`

### 📊 Étape 6: Feature Dashboard
- [ ] Extraire les composants de `dashboard/page.tsx`
- [ ] Créer `features/dashboard/components/`
- [ ] Créer `features/dashboard/hooks/useDashboard.ts`
- [ ] Mettre à jour les imports

### 🧹 Étape 7: Nettoyage
- [ ] Supprimer `app/landing-final.tsx`
- [ ] Supprimer `app/page-part2.tsx`
- [ ] Supprimer `app/components/` (après migration)
- [ ] Supprimer `type.ts` (remplacé par `features/cv/types/`)
- [ ] Supprimer `presets.ts` (déplacer vers `features/cv/`)
- [ ] Nettoyer les imports inutilisés

## 🔧 Comment Migrer un Composant

### Exemple: Migrer CVPreview

**Avant:**
```typescript
// app/components/CVPreview.tsx
import { PersonalDetails } from "@/type";
```

**Après:**
```typescript
// features/cv/components/CVPreview/CVPreview.tsx
import { PersonalDetails } from "@/features/cv/types/cv.types";
import { formatDate } from "@/lib/utils/date";
import { Card } from "@/components/ui/Card";
```

### Étapes:
1. Copier le fichier vers le nouveau dossier
2. Mettre à jour les imports
3. Extraire la logique réutilisable
4. Tester le composant
5. Mettre à jour les références
6. Supprimer l'ancien fichier

## 📦 Imports Recommandés

### Avant (Ancien)
```typescript
import { PersonalDetails } from "@/type";
import CVPreview from "@/app/components/CVPreview";
```

### Après (Nouveau)
```typescript
import { PersonalDetails } from "@/features/cv/types/cv.types";
import { CVPreview } from "@/features/cv/components/CVPreview";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils/date";
import { siteConfig } from "@/config/site";
```

## 🚨 Points d'Attention

### ⚠️ Ne PAS faire:
- ❌ Supprimer les anciens fichiers avant de migrer les imports
- ❌ Tout migrer d'un coup
- ❌ Oublier de tester après chaque migration
- ❌ Ignorer les erreurs TypeScript

### ✅ À faire:
- ✅ Migrer module par module
- ✅ Tester après chaque changement
- ✅ Garder les deux versions pendant la migration
- ✅ Mettre à jour la documentation
- ✅ Commiter régulièrement

## 🧪 Tests de Migration

Après chaque migration, vérifier:
1. ✅ L'application compile sans erreur
2. ✅ Les pages s'affichent correctement
3. ✅ Les fonctionnalités marchent
4. ✅ Pas de régression visuelle
5. ✅ Les imports sont corrects

## 📊 Progression

```
Phase 1: Configuration       ████████████████████ 100%
Phase 2: Composants UI       ████████░░░░░░░░░░░░  40%
Phase 3: Features            ░░░░░░░░░░░░░░░░░░░░   0%
Phase 4: Nettoyage           ░░░░░░░░░░░░░░░░░░░░   0%

Total:                       ████░░░░░░░░░░░░░░░░  35%
```

## 🎯 Prochaines Étapes

1. **Terminer les composants UI** (Modal, Badge, etc.)
2. **Migrer le module CV** (composants + hooks)
3. **Migrer le module Auth**
4. **Migrer le module Landing**
5. **Migrer le module Dashboard**
6. **Nettoyer les fichiers obsolètes**

## 💡 Conseils

- **Commiter souvent**: Chaque migration réussie = 1 commit
- **Tester localement**: Avant de pousser les changements
- **Documenter**: Mettre à jour ce guide au fur et à mesure
- **Demander de l'aide**: Si quelque chose n'est pas clair

## 🔗 Ressources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Documentation complète
- [README.md](./README.md) - Guide du projet
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**Note**: Cette migration peut être faite progressivement. L'application continue de fonctionner pendant la migration.
