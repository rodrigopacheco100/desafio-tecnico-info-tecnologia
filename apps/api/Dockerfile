FROM node:22.17.0-alpine AS development

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache wget

# Copiar arquivos de configuração primeiro (cache de layer)
COPY package*.json turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/broker-contracts/package*.json ./packages/broker-contracts/

# Instalar turbo globalmente e dependências
RUN npm install -g turbo && npm ci

EXPOSE 3000

# Comando para desenvolvimento: builda packages e inicia a API com watch
CMD ["sh", "-c", "turbo run build --filter=./packages/* && npm run dev:api"]

FROM node:22.17.0-alpine AS builder

WORKDIR /app

RUN apk add --no-cache wget

COPY package*.json turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/broker-contracts/package*.json ./packages/broker-contracts/

RUN npm ci && npm install -g turbo

COPY . .

RUN turbo run build

FROM node:22.17.0-alpine AS production

WORKDIR /app

RUN apk add --no-cache wget

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/broker-contracts/package*.json ./packages/broker-contracts/

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/broker-contracts/dist ./packages/broker-contracts/dist

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]
