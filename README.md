# 日本語学習 - Révision de Grammaire

Une application web interactive pour réviser la **grammaire japonaise**.

## 📋 Structure du projet

```
.
├── back/                      # Backend Express API (Node.js/TypeScript)
│   ├── src/
│   │   ├── index.ts          # Serveur Express + routes API
│   │   ├── controllers/       # Contrôleurs des endpoints
│   │   ├── services/          # Logique métier
│   │   ├── domain/
│   │   │   ├── entities/      # Adjective, Verb, AnswerCheck, Date, Hour, Number
│   │   │   └── shared/        # Types partagés (pronunciation)
│   │   └── infrastructure/
│   │       ├── repositories/  # Repository pattern
│   │       └── data/          # Données statiques (adjectifs, verbes)
│   ├── dist/                  # Code compilé
│   └── package.json
│
├── front/                     # Frontend React + Vite (TypeScript)
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── *RevisionPage.tsx  # Pages de révision
│   │   ├── components/
│   │   │   ├── molecules/     # AnswerInput, FeedbackDisplay, ModeSelector, PronunciationPanel
│   │   │   └── organisms/     # Blocs fonctionnels complexes
│   │   ├── hooks/             # Logique stateful réutilisable
│   │   ├── services/          # Appels API
│   │   ├── types/             # Interfaces TypeScript
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

### Nombres
```
GET /api/random                           # Nombre aléatoire (1-1,000,000,000)
GET /api/random?min=100&max=1000         # Nombre entre min et max
```

### Adjectifs
```
GET /api/random-adjective    # Adjectif aléatoire avec forme à conjuguer
```

**Réponse:**
```json
{
  "hiragana": "たかい",
  "type": "i",
  "translation": "haut/cher",
  "tense": "present",
  "polarity": "negative",
  "register": "polite",
  "answers": ["たかくありません", "たかくないです"]
}
```

### Verbes
```
GET /api/random-verb    # Verbe aléatoire avec forme à conjuguer
```

**Réponse:**
```json
{
  "kanji": "食べる",
  "hiragana": "たべる",
  "type": "ichidan",
  "translation": "manger",
  "form": { "kind": "indicative", "tense": "present", "polarity": "affirmative", "register": "polite" },
  "answers": ["食べます", "たべます"]
}
```

Formes disponibles : `indicative`, `potential`, `passive`, `causative`, `imperative`, `te`, `volitional`, `tara`, `ba`.

### Heures & Dates
```
GET /api/random-hour    # Heure aléatoire
GET /api/random-date    # Date aléatoire
```

### Vérification de réponse
```
POST /api/check-answer
```

**Corps:**
```json
{ "userAnswer": "たかくない", "expectedAnswers": ["たかくない", "たかくないです"] }
```

**Réponse:**
```json
{ "correct": true }
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

**État:** ✅ **447/447 backend tests** | ✅ **69/69 frontend tests**

## 🔧 Stack technologique

| Couche | Technologie |
|--------|-------------|
| **Backend** | Node.js, Express, TypeScript |
| **Frontend** | React 18, Vite, TypeScript |
| **Tests** | Vitest, Supertest, Testing Library |
| **Linting** | ESLint, TypeScript-ESLint |
| **Formatting** | Prettier |
| **Git Hooks** | Husky, lint-staged (lint + typecheck au commit) |
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

## 🎓 Données statiques

Les données sont dans `back/src/infrastructure/data/` :
- `adjectives.ts` - Liste des adjectifs i et na avec leurs métadonnées
- `verbs.ts` - Liste des verbes godan, ichidan et irréguliers

## 📖 Documentation supplémentaire

- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Guide complet Railway
- [doc/adjective-conjugation.md](./doc/adjective-conjugation.md) - Cas de conjugaison des adjectifs (réponses acceptées)
- [doc/verb-conjugation.md](./doc/verb-conjugation.md) - Cas de conjugaison des verbes (toutes les formes)

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
npm run typecheck          # TypeScript (back + front via les sous-projets)
```