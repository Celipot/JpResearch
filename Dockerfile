# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy configuration files
COPY package.json package-lock.json ./
COPY back/package.json back/package-lock.json ./back/
COPY front/package.json front/package-lock.json ./front/
COPY back/tsconfig.json ./back/
COPY back/fix-esm-imports.mjs ./back/
COPY front/tsconfig.json ./front/
COPY front/vite.config.ts ./front/

# Copy source code
COPY back/src ./back/src
COPY front/src ./front/src
COPY front/index.html ./front/

# Install dependencies
RUN npm ci
RUN npm --prefix back ci --legacy-peer-deps 2>/dev/null || npm --prefix back ci
RUN npm --prefix front ci --legacy-peer-deps 2>/dev/null || npm --prefix front ci

# Build
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy only runtime dependencies and built files
COPY --from=builder /app/back/node_modules ./back/node_modules
COPY --from=builder /app/back/dist ./back/dist
COPY --from=builder /app/back/package.json ./back/
COPY --from=builder /app/front/dist ./front/dist

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Start server
CMD ["node", "back/dist/index.js"]
