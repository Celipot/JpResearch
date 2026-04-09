# Déploiement sur Railway

Ce projet est prêt pour être déployé sur **Railway** !

## 📋 Structure du projet

C'est un **monorepo** avec :
- **Backend** : Express API (Node.js/TypeScript) sur le port 3000/3001
- **Frontend** : React app (Vite) compilée en fichiers statiques
- **Backend sert le frontend** : Les fichiers statiques sont servis depuis le backend

## 🚀 Déploiement sur Railway

Ce projet utilise un **Dockerfile** pour un déploiement fiable et reproductible.

### Option 1 : Via l'interface web (Recommandé)

1. **Créer un compte Railway** : https://railway.app
2. **Connecter ton repo GitLab** :
   - Clique sur "New Project"
   - Sélectionne "Deploy from Git"
   - Choisis "GitLab"
   - Autorise l'accès à ton GitLab
   - Sélectionne ton repo
3. **Configurer les variables d'env** (optionnel) :
   - `NODE_ENV=production`
   - `PORT=3000` (optionnel, Railway définit automatiquement)
4. **Déployer** : Railway détecte automatiquement le build et les start scripts depuis `package.json`

### Option 2 : Avec Railway CLI

```bash
# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Créer un nouveau projet
railway init

# Déployer
railway up
```

## 📦 Ce qui se passe lors du déploiement

1. **Build** :
   ```bash
   npm run build
   ```
   - Compile le frontend React avec Vite → `front/dist/`
   - Compile le backend TypeScript → `back/dist/`

2. **Start** :
   ```bash
   npm start
   ```
   - Lance le serveur Express sur le port défini par Railway
   - Le backend sert l'API ET les fichiers statiques du frontend

3. **Frontend** : Tous les fichiers sont servis depuis `http://your-railway-app.up.railway.app`

## 📝 Fichiers de configuration

- **`railway.json`** : Configuration Railway (build et deploy)
- **`Procfile`** : Processus web à lancer
- **`package.json`** : Scripts build/start au root
- **`.env.example`** : Variables d'env requises (vides pour ce projet)

## 🔗 Variables d'env

Aucune variable requise. La seule variable utilisée est `PORT` qui est définie automatiquement par Railway.

## ✅ Checklist avant de déployer

- ✅ Backend sert le frontend statique
- ✅ Scripts build et start configurés au root
- ✅ Tous les fichiers compilés en `dist/`
- ✅ Tests passent : `npm test`
- ✅ Build complet réussit : `npm run build`

## 🧪 Tester localement avant de déployer

```bash
# Build
npm run build

# Start le serveur (comme en prod)
npm start

# Accéder à http://localhost:3001
```

## 🆘 Troubleshooting

### Le frontend ne s'affiche pas
- Vérifie que `front/dist/` existe après le build
- Vérifie que le backend sert bien les fichiers statiques depuis `back/src/index.ts`

### Erreur lors du build
- Vérifie que tous les dépendances sont installées : `npm install`
- Teste localement : `npm run build`

### Erreur lors du start
- Vérifie les logs Railway
- Assure-toi que le port est bien défini par Railway (variable `PORT`)

## 📚 Ressources

- [Railway Docs](https://docs.railway.app)
- [Railway CLI Guide](https://docs.railway.app/cli/quick-start)
- [Environment Variables](https://docs.railway.app/develop/variables)
