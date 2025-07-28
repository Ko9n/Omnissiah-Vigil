# Build stage
FROM node:18-alpine AS builder

# Установка pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Копируем необходимые файлы из этапа сборки
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем только production зависимости
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"] 