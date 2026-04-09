# Build stage
FROM node:22.17.0-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/consumer-service/package.json ./apps/consumer-service/

RUN pnpm install

COPY apps/consumer-service/src ./apps/consumer-service/src
COPY apps/consumer-service/tsconfig.json ./apps/consumer-service/
COPY apps/consumer-service/nest-cli.json ./apps/consumer-service/
COPY apps/consumer-service/biome.json ./apps/consumer-service/

WORKDIR /app/apps/consumer-service
RUN pnpm run build

FROM node:22.17.0-alpine AS production

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/consumer-service/package.json ./apps/consumer-service/

RUN pnpm install --prod

COPY --from=builder /app/apps/consumer-service/dist ./apps/consumer-service/dist

WORKDIR /app/apps/consumer-service

CMD ["node", "dist/main.js"]
