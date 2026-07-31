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

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/pacotes/compartilhado/package*.json ./pacotes/compartilhado/

RUN npm ci --omit=dev

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/pacotes/compartilhado ./pacotes/compartilhado

WORKDIR /app/apps/api
EXPOSE 3000

CMD ["node", "dist/main"]
