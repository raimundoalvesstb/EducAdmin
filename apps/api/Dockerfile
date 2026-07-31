FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
# Copy workspace package files
COPY apps/api/package*.json ./apps/api/
COPY pacotes/compartilhado/package*.json ./pacotes/compartilhado/

RUN npm install

COPY . .

WORKDIR /app/apps/api
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/apps/api/package*.json ./apps/api/
COPY --from=builder --chown=node:node /app/pacotes/compartilhado/package*.json ./pacotes/compartilhado/

RUN npm ci --omit=dev

COPY --from=builder --chown=node:node /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=node:node /app/pacotes/compartilhado ./pacotes/compartilhado

USER node

WORKDIR /app/apps/api
EXPOSE 3000

CMD ["node", "dist/main"]
