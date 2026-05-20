FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY back/package*.json back/tsconfig.json back/fix-esm-imports.mjs ./back/
COPY front/package*.json front/tsconfig.json front/vite.config.ts ./front/
COPY front/index.html ./front/

RUN npm ci --ignore-scripts
RUN npm --prefix back ci --ignore-scripts
RUN npm --prefix front ci --ignore-scripts

COPY back/src ./back/src
COPY front/src ./front/src

RUN npm run build


FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/back/package*.json ./back/
RUN npm --prefix back ci --omit=dev --ignore-scripts

COPY --from=build /app/back/dist ./back/dist
COPY --from=build /app/front/dist ./front/dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "back/dist/index.js"]
