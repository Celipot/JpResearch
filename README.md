# Boilerplate Web App

Stack simple Front + Back en TypeScript.

## Structure

```
├── back/              # Backend Express
│   ├── src/
│   │   └── index.ts   # Serveur + routes API
│   ├── package.json
│   └── tsconfig.json
├── front/             # Frontend React + Vite
│   ├── src/
│   │   ├── App.tsx    # Composant principal
│   │   ├── main.tsx   # Point d'entrée
│   │   └── index.css  # Styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Démarrage

### Backend

```bash
cd back
npm install
npm run dev
```

Le serveur tourne sur `http://localhost:3001`

### Frontend

```bash
cd front
npm install
npm run dev
```

L'app tourne sur `http://localhost:5173`

Le proxy Vite redirige automatiquement `/api` vers le backend.

## API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | État du serveur |
| GET | `/api/items` | Liste des items |
| POST | `/api/items` | Créer un item `{ name, description }` |

## Build production

```bash
# Backend
cd back
npm run build
npm start

# Frontend
cd front
npm run build
```
