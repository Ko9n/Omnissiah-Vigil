# Build stage
FROM node:18-alpine AS builder

# Установка pnpm и необходимых пакетов для сборки
RUN npm install -g pnpm
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Копируем файлы package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент и собираем приложение
RUN npx prisma generate
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Устанавливаем необходимые пакеты
RUN apk add --no-cache openssl sqlite

# Копируем необходимые файлы из этапа сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Создаем директорию для SQLite и устанавливаем права
RUN mkdir -p prisma/data && \
    chmod -R 777 prisma/data

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL="file:./prisma/data/dev.db"

EXPOSE 5000

# Запускаем миграции и приложение
CMD npx prisma migrate deploy && npm start 