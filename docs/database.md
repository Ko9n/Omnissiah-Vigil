# 🗄️ Руководство по базам данных

## 📊 Выбор базы данных: SQLite vs PostgreSQL

### 🟢 SQLite (рекомендуется для начала)

**Используйте SQLite если:**

- ✅ < 50 устройств в мониторинге
- ✅ Простое развертывание (один файл)
- ✅ Локальная разработка и тестирование
- ✅ Не нужна долгосрочная история (> 3 месяцев)
- ✅ Один сервер мониторинга
- ✅ Размер БД < 1GB

**Текущая нагрузка SQLite:**

- Размер БД: ~155KB (очень мало)
- Операции: Обновления статуса каждые 30 сек
- История: НЕ сохраняется (пока)

### 🟣 PostgreSQL (для масштабирования)

**Переходите на PostgreSQL если:**

- 🔥 > 100 устройств
- 🔥 Нужна история на месяцы/годы
- 🔥 Планируется кластеризация
- 🔥 Сложная аналитика и отчеты
- 🔥 Несколько серверов мониторинга
- 🔥 Высокие требования к производительности

**Прогноз нагрузки с историей:**

```bash
# 100 устройств × 2880 записей/день = 288,000 записей/день
# За год: ~105 млн записей в ping_history
# Системные метрики: +2880 записей/день
```

---

## 🚀 Быстрый старт

### SQLite (по умолчанию)

```bash
# Уже настроено, просто запустите:
cd packages/backend
npm run dev
```

### PostgreSQL

```bash
# 1. Переключиться на PostgreSQL
cd packages/backend
npm run db:switch:postgres

# 2. Запустить PostgreSQL в Docker
npm run db:setup:postgres

# 3. Запустить приложение
npm run dev
```

---

## 🔄 Переключение между базами данных

### Команды переключения

```bash
# Переключиться на SQLite
npm run db:switch:sqlite
npm run db:setup:sqlite

# Переключиться на PostgreSQL
npm run db:switch:postgres
npm run db:setup:postgres
```

### Ручное переключение

#### На PostgreSQL:

1. **Обновить `prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "postgresql"  // ← Раскомментировать
  url      = env("DATABASE_URL")
}
```

2. **Обновить `.env`:**

```bash
DATABASE_URL="postgresql://monitoring_user:monitoring_password@localhost:5432/monitoring_db"
```

3. **Запустить PostgreSQL:**

```bash
docker-compose up postgres -d
```

4. **Применить миграции:**

```bash
npx prisma migrate deploy
npx prisma generate
```

#### На SQLite:

1. **Обновить `prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "sqlite"  // ← Раскомментировать
  url      = env("DATABASE_URL")
}
```

2. **Обновить `.env`:**

```bash
DATABASE_URL="file:./prisma/data/dev.db"
```

3. **Применить миграции:**

```bash
npx prisma migrate deploy
npx prisma generate
```

---

## 🔧 Настройка PostgreSQL

### Docker Compose (автоматически)

```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: monitoring_db
    POSTGRES_USER: monitoring_user
    POSTGRES_PASSWORD: monitoring_password
  ports:
    - "5432:5432"
```

### Ручная установка

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Создать базу данных
sudo -u postgres createdb monitoring_db
sudo -u postgres createuser monitoring_user -P
```

---

## 📈 Оптимизация производительности

### SQLite оптимизация

```sql
-- Включить WAL режим (быстрее записи)
PRAGMA journal_mode = WAL;

-- Увеличить кэш
PRAGMA cache_size = 10000;

-- Синхронизация (безопасность vs скорость)
PRAGMA synchronous = NORMAL;
```

### PostgreSQL оптимизация

```sql
-- Настройки для мониторинга (postgresql.conf)
shared_buffers = 256MB
effective_cache_size = 1GB
random_page_cost = 1.1
checkpoint_completion_target = 0.9

-- Партиционирование по времени для ping_history
CREATE TABLE ping_history_2024_01 PARTITION OF ping_history
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### Индексы для больших нагрузок

```sql
-- Оптимальные индексы уже добавлены в schema.prisma:

-- Для быстрых временных запросов
@@index([deviceId, timestamp(sort: Desc)])
@@index([timestamp(sort: Desc)])

-- Для uptime расчетов
@@index([deviceId, isAlive])

-- Для алертов
@@index([isResolved, severity])
```

---

## 🔄 Миграция данных

### Экспорт из SQLite

```bash
# Экспорт в SQL
sqlite3 prisma/data/dev.db .dump > backup.sql

# Экспорт конкретной таблицы
sqlite3 prisma/data/dev.db ".mode csv" ".headers on" ".output devices.csv" "SELECT * FROM devices;"
```

### Импорт в PostgreSQL

```bash
# Через Prisma
npx prisma db seed

# Или через SQL
psql -h localhost -U monitoring_user -d monitoring_db -f backup.sql
```

---

## 🎯 Рекомендации по масштабированию

### Когда мигрировать на PostgreSQL:

1. **По количеству устройств:**

   - < 50 устройств: SQLite ✅
   - 50-100 устройств: SQLite/PostgreSQL 🤔
   - > 100 устройств: PostgreSQL 🔥

2. **По размеру БД:**

   - < 100MB: SQLite ✅
   - 100MB-1GB: PostgreSQL рекомендуется
   - > 1GB: PostgreSQL обязательно 🔥

3. **По нагрузке записи:**
   - < 1000 записей/час: SQLite ✅
   - 1000-10000 записей/час: PostgreSQL рекомендуется
   - > 10000 записей/час: PostgreSQL обязательно 🔥

### Постепенная миграция:

1. Настроить PostgreSQL параллельно
2. Протестировать производительность
3. Перенести данные
4. Переключить приложение
5. Мониторить производительность

---

## 🛠️ Полезные команды

```bash
# Prisma команды
npx prisma studio          # Открыть веб-интерфейс БД
npx prisma migrate dev      # Создать новую миграцию
npx prisma migrate deploy   # Применить миграции
npx prisma generate         # Перегенерировать клиент
npx prisma db seed          # Заполнить тестовыми данными

# Docker команды
docker-compose up postgres -d     # Запустить только PostgreSQL
docker-compose logs postgres      # Посмотреть логи PostgreSQL
docker-compose down               # Остановить все сервисы

# Мониторинг БД
docker exec -it monitoring-postgres psql -U monitoring_user -d monitoring_db
```

---

## 🔍 Troubleshooting

### Проблемы с SQLite

```bash
# Проверить целостность БД
sqlite3 prisma/data/dev.db "PRAGMA integrity_check;"

# Исправить БД
sqlite3 prisma/data/dev.db "VACUUM;"
```

### Проблемы с PostgreSQL

```bash
# Проверить подключение
docker exec monitoring-postgres pg_isready -U monitoring_user

# Посмотреть активные соединения
docker exec -it monitoring-postgres psql -U monitoring_user -d monitoring_db -c "SELECT * FROM pg_stat_activity;"
```

**Последнее обновление:** 2024-12-19
