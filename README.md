# ⚙️ Omnissiah Vigil

> _"От машины дух исходит, и дух машины должен быть чист"_

**Система мониторинга сети в стиле Warhammer 40k**

Современная система мониторинга сети с веб-интерфейсом, real-time обновлениями и расширенной аналитикой.

## ✨ Возможности

- 📊 **Real-time мониторинг** - мгновенные обновления статуса устройств
- 🔍 **Множественные методы проверки** - ping, TCP, системные команды
- 📁 **Организация устройств** - папки и категории
- 📈 **История и аналитика** - графики и статистика
- 🔐 **Безопасность** - аутентификация WebSocket, валидация данных
- ⚡ **Производительность** - кэширование, оптимизированные запросы
- 📝 **Логирование** - структурированные логи с ротацией
- 🐳 **Docker поддержка** - простое развертывание
- 🔍 **Автосканер сети** - автоматическое обнаружение устройств с помощью nmap

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   Database      │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 5433    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         └──────────────►│   WebSocket     │
                        │   Real-time     │
                        │   Updates       │
                        └─────────────────┘
                                │
                        ┌─────────────────┐
                        │   Nmap Scanner  │
                        │   Network       │
                        │   Discovery     │
                        └─────────────────┘
```

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (опционально, можно использовать SQLite)
- **Nmap** (для автосканирования сети)

### Установка nmap

#### Windows

1. Скачайте nmap с [официального сайта](https://nmap.org/download.html)
2. Установите скачанный файл
3. Добавьте nmap в PATH

#### macOS

```bash
brew install nmap
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nmap
```

#### Linux (CentOS/RHEL)

```bash
sudo yum install nmap
# или для новых версий
sudo dnf install nmap
```

**Примечание**: При использовании Docker nmap уже включен в образ.

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd monitoring-main
```

### 2. Настройка переменных окружения

Скопируйте пример файла и настройте переменные:

```bash
cp packages/backend/env.example packages/backend/.env
```

Отредактируйте `.env` файл:

```env
# Database Configuration
DATABASE_URL="postgresql://monitoring_user:monitoring_password@localhost:5433/monitoring_db"

# Server Configuration
PORT=5000
NODE_ENV=development

# WebSocket Authentication
WS_AUTH_TOKEN=your-secure-websocket-token

# Logging
LOG_LEVEL=info
```

### 3. Установка зависимостей

```bash
# Установка pnpm (если не установлен)
npm install -g pnpm

# Установка зависимостей
pnpm install
```

### 4. Настройка базы данных

```bash
# Генерация Prisma клиента
cd packages/backend
pnpm prisma:generate

# Применение миграций
pnpm prisma:migrate

# Заполнение тестовыми данными (опционально)
pnpm prisma:seed
```

### 5. Запуск в режиме разработки

```bash
# Запуск бэкенда
cd packages/backend
pnpm dev

# В новом терминале - запуск фронтенда
cd packages/frontend
pnpm dev
```

### 6. Запуск с Docker

```bash
# Создание .env файла для Docker
cp env.example .env

# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f
```

## 🔧 Конфигурация

### Переменные окружения

| Переменная                    | Описание                      | По умолчанию  |
| ----------------------------- | ----------------------------- | ------------- |
| `DATABASE_URL`                | URL подключения к БД          | -             |
| `PORT`                        | Порт сервера                  | 5000          |
| `NODE_ENV`                    | Окружение                     | development   |
| `WS_AUTH_TOKEN`               | Токен для WebSocket           | dev-token-123 |
| `LOG_LEVEL`                   | Уровень логирования           | info          |
| `CACHE_TTL`                   | Время жизни кэша (мс)         | 300000        |
| `RATE_LIMIT_MAX_REQUESTS`     | Лимит запросов                | 100           |
| `PING_HISTORY_RETENTION_DAYS` | Хранение истории пингов (дни) | 90            |

### Настройка мониторинга

В файле `packages/backend/src/websocket/socketServer.ts` можно настроить:

- Интервал мониторинга (по умолчанию 30 сек)
- Таймауты ping запросов
- Методы проверки доступности

## 📊 API Endpoints

### Устройства

- `GET /api/devices` - список устройств
- `GET /api/devices/:id` - информация об устройстве
- `POST /api/devices` - создание устройства
- `PUT /api/devices/:id` - обновление устройства
- `DELETE /api/devices/:id` - удаление устройства
- `POST /api/devices/:id/ping` - ping устройства
- `POST /api/devices/scan-network` - сканирование сети
- `POST /api/devices/bulk-create` - массовое создание устройств

### Метрики

- `GET /api/metrics/system` - системные метрики
- `GET /api/metrics/network` - сетевые метрики
- `GET /api/metrics/bandwidth` - данные пропускной способности

### Папки

- `GET /api/folders` - список папок
- `POST /api/folders` - создание папки
- `PUT /api/folders/:id` - обновление папки
- `DELETE /api/folders/:id` - удаление папки

### Система

- `GET /api/health` - проверка здоровья системы
- `GET /api/cache/stats` - статистика кэша

## 🔐 Безопасность

### WebSocket аутентификация

Для подключения к WebSocket необходимо передать токен:

```javascript
const socket = io("ws://localhost:5000", {
  auth: {
    token: "your-websocket-token",
  },
});
```

### Валидация данных

Все входные данные валидируются с помощью Zod схем:

- Проверка IP адресов
- Валидация MAC адресов
- Проверка типов устройств
- Санитизация строк

### Rate Limiting

По умолчанию: 100 запросов за 15 минут на IP адрес.

## 📝 Логирование

Логи сохраняются в папку `logs/`:

- `combined.log` - все логи
- `error.log` - только ошибки

В продакшене логи не выводятся в консоль.

## 🐛 Отладка

### Просмотр логов

```bash
# Логи бэкенда
tail -f packages/backend/logs/combined.log

# Логи Docker
docker-compose logs -f backend
```

### Проверка здоровья системы

```bash
curl http://localhost:5000/api/health
```

### Статистика кэша

```bash
curl http://localhost:5000/api/cache/stats
```

## 🔄 Обновления

### Обновление базы данных

```bash
cd packages/backend
pnpm prisma:migrate
pnpm prisma:generate
```

### Обновление зависимостей

```bash
pnpm update
```

## 🤝 Разработка

### Структура проекта

```
packages/
├── backend/          # Express.js сервер
│   ├── src/
│   │   ├── controllers/    # Контроллеры API
│   │   ├── middleware/     # Middleware
│   │   ├── routes/         # Маршруты
│   │   ├── utils/          # Утилиты
│   │   └── websocket/      # WebSocket сервер
│   └── prisma/             # Схема БД
└── frontend/        # Next.js приложение
    └── src/
        ├── components/     # React компоненты
        ├── hooks/          # React хуки
        ├── lib/            # Утилиты
        └── store/          # Zustand store
```

### Добавление новых функций

1. Создайте миграцию для БД (если нужно)
2. Добавьте контроллер в `packages/backend/src/controllers/`
3. Создайте маршрут в `packages/backend/src/routes/`
4. Добавьте компонент в `packages/frontend/src/components/`
5. Обновите типы в `packages/frontend/src/types/`

### Тестирование

```bash
# Тесты бэкенда
cd packages/backend
pnpm test

# Тесты фронтенда
cd packages/frontend
pnpm test
```

## 📄 Лицензия

MIT License

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Commit изменения
4. Push в branch
5. Создайте Pull Request

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в `packages/backend/logs/`
2. Убедитесь, что все переменные окружения настроены
3. Проверьте подключение к базе данных
4. Создайте issue в репозитории

## 🔍 Автосканер сети

### Возможности сканера

- **Автоматическое обнаружение** устройств в указанной сети
- **Получение MAC адресов** и информации о производителе
- **Фильтрация существующих** устройств - показываются только новые
- **Массовое добавление** выбранных устройств
- **Интеграция с папками** - устройства добавляются в выбранную папку

### Использование

1. **В списке устройств**: Нажмите кнопку "Сканировать сеть"
2. **При добавлении устройства**: Нажмите кнопку "Сканировать" рядом с полем IP
3. Введите адрес сети (например: `192.168.1.0/24`)
4. Выберите найденные устройства для добавления

### Примеры сетей

- `192.168.1.0/24` - 254 устройства (192.168.1.1 - 192.168.1.254)
- `10.0.0.0/16` - 65534 устройства (10.0.0.1 - 10.0.255.254)
- `172.16.0.0/12` - 1048574 устройства (172.16.0.1 - 172.31.255.254)

### Безопасность

⚠️ **Важно**: Сканирование сети может быть обнаружено системами безопасности. Используйте только в доверенных сетях.

**Рекомендации**:

- Получите разрешение администратора сети
- Сканируйте только свои сети
- Не используйте агрессивные методы сканирования
- Учитывайте политики безопасности организации

Подробная документация по сканеру: [README_NETWORK_SCANNER.md](packages/backend/README_NETWORK_SCANNER.md)

## 📚 Документация

- [База данных](docs/database.md)
- [Сканер сети](docs/network-scanner.md)
