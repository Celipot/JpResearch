# 日本語学習 - Révision de Grammaire

Une application web interactive pour réviser la **grammaire japonaise** avec des exercices de remplissage, choix multiples et traduction.

## 📋 Structure du projet

```
.
├── back/                      # Backend Express API (Node.js/TypeScript)
│   ├── src/
│   │   ├── index.ts          # Serveur Express + routes API
│   │   ├── controllers/       # Contrôleurs des endpoints
│   │   ├── services/          # Logique métier
│   │   ├── domain/
│   │   │   ├── entities/      # Exercise, GrammarRule
│   │   │   └── data/          # 14 fichiers d'exercices JSON
│   │   └── infrastructure/    # Repository pattern
│   ├── dist/                  # Code compilé
│   └── package.json
│
├── front/                     # Frontend React + Vite (TypeScript)
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/        # Pages de révision
│   │   ├── __tests__/         # Tests Vitest
│   │   └── index.css
│   ├── dist/                  # Build statique
│   └── package.json
│
├── package.json               # Scripts root (build/start/test)
├── railway.json               # Configuration Railway
├── Procfile                    # Process web pour Railway
└── RAILWAY_DEPLOYMENT.md      # Guide de déploiement
```

## 🚀 Démarrage local

### Installation

```bash
# À la racine du projet
npm install
cd back && npm install
cd ../front && npm install
cd ..
```

### Mode développement

```bash
# Terminal 1: Backend (port 3001)
npm run dev:back

# Terminal 2: Frontend (port 5173)
npm run dev:front
```

Accédez à : `http://localhost:5173`

Le proxy Vite redirige automatiquement `/api` vers le backend.

### Build production

```bash
# Compile frontend (React) + backend (Express)
npm run build

# Lance le serveur (sert frontend + API)
npm start
```

Accédez à : `http://localhost:3001`

## 📚 API Endpoints

### Exercices grammaticaux
```
GET /api/exercises/random?rule=wa     # Exercice aléatoire pour は
GET /api/exercises/random?rule=wo     # Exercice aléatoire pour を
... (14 particules: wa, wo, ga, ni, de, kara, made, mo, no, he, to, ya, yori, dake)
```

**Réponse:**
```json
{
  "type": "fill-in-the-blank|multiple-choice|translation",
  "rule": {
    "id": "wa",
    "particle": "は",
    "name": "Topic",
    "description": "Marque le sujet du discours"
  },
  "question": "わたし___がくせいです。",
  "correctAnswers": ["は"],
  "options": null,
  "explanation": "は marque le topic : わたし est ce dont on parle."
}
```

### Nombres
```
GET /api/random                           # Nombre aléatoire (1-1,000,000,000)
GET /api/random?min=100&max=1000         # Nombre entre min et max
```

### Heures & Dates
```
GET /api/random-hour    # Heure aléatoire
GET /api/random-date    # Date aléatoire
```

## 🧪 Tests

```bash
# Tous les tests (backend + frontend)
npm test

# Backend uniquement (364 tests)
npm run test:back

# Frontend uniquement (74 tests)
npm run test:front
```

**État:** ✅ **364/364 backend tests** | ✅ **74/76 frontend tests** (2 tests non-relatifs)

## 🔧 Stack technologique

| Couche | Technologie |
|--------|-------------|
| **Backend** | Node.js, Express, TypeScript |
| **Frontend** | React 18, Vite, TypeScript |
| **Tests** | Vitest, Supertest, Testing Library |
| **Linting** | ESLint, TypeScript-ESLint |
| **Formatting** | Prettier |
| **Git Hooks** | Husky, lint-staged |
| **Déploiement** | Railway |

## 📦 Dépendances principales

### Backend
- `express` - Framework API
- `cors` - CORS middleware

### Frontend
- `react` - Libraire UI
- `react-router-dom` - Routing SPA

### Dev
- `typescript` - Typage TypeScript
- `vitest` - Test runner
- `vite` - Bundler frontend

## 🌐 Déployer sur Railway

Le projet est **prêt pour Railway** ! Voir [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

### Déploiement rapide

```bash
# 1. Committer et pusher sur GitLab
git add .
git commit -m "chore: prepare for Railway"
git push

# 2. Sur https://railway.app
# - Créer un compte
# - Connecter repo GitLab
# - Railway détecte et déploie automatiquement !
```

## 📝 Variables d'environnement

Aucune variable requise. `PORT` est définie automatiquement par Railway.

Optionnel pour développement local :
```
NODE_ENV=development
PORT=3001
```

## 🎓 Données des exercices

Tous les exercices sont stockés dans `back/src/domain/data/` :
- `waExercises.json` / `.ts` - Particule は
- `woExercises.json` / `.ts` - Particule を
- `gaExercises.json` / `.ts` - Particule が
- ... (11 autres particules)

Chaque fichier contient 30 exercices structurés :
```json
{
  "rule": { "id": "wa", "particle": "は", "name": "...", "description": "..." },
  "exercises": [
    {
      "type": "fill-in-the-blank",
      "question": "わたし___がくせいです。",
      "correctAnswers": ["は"],
      "explanation": "は marque le topic...",
      "options": null
    },
    { "type": "multiple-choice", ... },
    { "type": "translation", ... }
  ]
}
```

## 📖 Documentation supplémentaire

- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Guide complet Railway
- [jlpt-n5-vocabulary.md](./doc/jlpt-n5-vocabulary.md) - Vocabulaire JLPT N5 (source des exercices)

## 🛠️ Scripts utiles

```bash
# Développement
npm run dev                 # Lance back + front
npm run dev:back           # Backend seulement
npm run dev:front          # Frontend seulement

# Production
npm run build              # Compile tout
npm start                  # Lance le serveur

# Testing
npm test                   # Tous les tests
npm run test:back          # Tests backend
npm run test:front         # Tests frontend

# Qualité de code
npm run lint               # ESLint (back + front)
npm run lint:fix           # Auto-fix lint issues
npm run format             # Prettier (back + front)
npm run format:check       # Vérifier formatting
```

## 📄 Licence

Projet d'apprentissage du japonais