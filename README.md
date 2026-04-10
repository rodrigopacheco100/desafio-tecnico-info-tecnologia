# info-tec - API de Gestão de Veículos

![Info Tecnologia](https://media.licdn.com/dms/image/v2/D4D0BAQE0jCZX15oY2Q/company-logo_200_200/B4DZt.b5uDKQAM-/0/1767352802533/info20anos_logo?e=1777507200&v=beta&t=VD5aeaMJbuLkkhBnENMBKEnBiXI7hEoxXVepknV232U)

API REST para gestão de veículos, marcas, modelos e categorias, com autenticação JWT.

## Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-339933?logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234D?logo=nestjs)](https://nestjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-F4A261?logo=&logoColor=white)](https://orm.drizzle.team)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.x-FF6600?logo=rabbitmq)](https://www.rabbitmq.com)
[![Vitest](https://img.shields.io/badge/Vitest-4.x-6D9F14?logo=vite)](https://vitest.dev)
[![Biome](https://img.shields.io/badge/Biome-Linter-60B5FF?logo=&logoColor=white)](https://biomejs.dev)

## Como Rodar

```bash
# Instalar dependências
pnpm install

# Iniciar todos os serviços via Docker (API, Consumer Service, PostgreSQL, RabbitMQ)
docker compose up -d
```

A API estará disponível em `http://localhost:3000`
