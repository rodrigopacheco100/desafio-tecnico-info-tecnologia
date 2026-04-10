# Build stage
FROM node:22.17.0-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml lerna.json pnpm-lock.yaml ./
COPY apps/consumer-service/package.json ./apps/consumer-service/

RUN corepack pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/consumer-service
RUN corepack pnpm run build

FROM node:22.17.0-alpine AS production

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml lerna.json pnpm-lock.yaml ./
COPY apps/consumer-service/package.json ./apps/consumer-service/

RUN pnpm install --prod

COPY --from=builder /app/apps/consumer-service/dist ./apps/consumer-service/dist

WORKDIR /app/apps/consumer-service

CMD ["node", "dist/main.js"]
