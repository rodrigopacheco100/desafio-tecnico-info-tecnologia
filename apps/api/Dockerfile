FROM node:22.17.0-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate && apk add --no-cache wget

COPY package.json pnpm-workspace.yaml .npmrc lerna.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/broker-contracts/package.json ./packages/broker-contracts/

RUN corepack pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/api
RUN corepack pnpm run build

FROM node:22.17.0-alpine AS production

WORKDIR /app

RUN apk add --no-cache wget

COPY package.json pnpm-workspace.yaml .npmrc pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/broker-contracts/package.json ./packages/broker-contracts/

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate && corepack pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/broker-contracts/dist ./packages/broker-contracts/dist

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]
