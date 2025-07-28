#!/usr/bin/env node

/**
 * Скрипт для переключения между SQLite и PostgreSQL
 *
 * Использование:
 * node scripts/switch-db.js sqlite    # Переключиться на SQLite
 * node scripts/switch-db.js postgres  # Переключиться на PostgreSQL
 */

const fs = require("fs");
const path = require("path");

const SCHEMA_FILE = path.join(__dirname, "../prisma/schema.prisma");
const ENV_FILE = path.join(__dirname, "../.env");

const SQLITE_CONFIG = {
  provider: "sqlite",
  url: "file:./prisma/data/dev.db",
};

const POSTGRES_CONFIG = {
  provider: "postgresql",
  url: "postgresql://monitoring_user:monitoring_password@localhost:5433/monitoring_db",
};

function updateSchema(dbType) {
  let schema = fs.readFileSync(SCHEMA_FILE, "utf8");

  if (dbType === "sqlite") {
    // Включаем SQLite, отключаем PostgreSQL
    schema = schema.replace(
      /\/\/ SQLite[\s\S]*?url\s*=\s*env\("DATABASE_URL"\)/,
      `// SQLite (по умолчанию) - для небольших проектов
  provider = "sqlite"
  url      = env("DATABASE_URL")`
    );

    schema = schema.replace(
      /\/\/ PostgreSQL[\s\S]*?\/\/ url\s*=\s*env\("DATABASE_URL"\)/,
      `// PostgreSQL - раскомментировать для использования
  // provider = "postgresql"
  // url      = env("DATABASE_URL")`
    );
  } else if (dbType === "postgres") {
    // Включаем PostgreSQL, отключаем SQLite
    schema = schema.replace(
      /\/\/ SQLite[\s\S]*?url\s*=\s*env\("DATABASE_URL"\)/,
      `// SQLite (по умолчанию) - для небольших проектов
  // provider = "sqlite"
  // url      = env("DATABASE_URL")`
    );

    schema = schema.replace(
      /\/\/ PostgreSQL[\s\S]*?\/\/ url\s*=\s*env\("DATABASE_URL"\)/,
      `// PostgreSQL - раскомментировать для использования
  provider = "postgresql"
  url      = env("DATABASE_URL")`
    );
  }

  fs.writeFileSync(SCHEMA_FILE, schema);
}

function updateEnv(dbType) {
  let envContent = "";

  // Читаем существующий .env если есть
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, "utf8");
  }

  // Удаляем старые DATABASE_URL
  envContent = envContent.replace(/DATABASE_URL=.*\n?/g, "");

  // Добавляем новый DATABASE_URL
  if (dbType === "sqlite") {
    envContent += `\n# SQLite Configuration
DATABASE_URL="${SQLITE_CONFIG.url}"
`;
  } else if (dbType === "postgres") {
    envContent += `\n# PostgreSQL Configuration
DATABASE_URL="${POSTGRES_CONFIG.url}"
`;
  }

  fs.writeFileSync(ENV_FILE, envContent.trim() + "\n");
}

function main() {
  const dbType = process.argv[2];

  if (!dbType || !["sqlite", "postgres"].includes(dbType)) {
    console.log("❌ Ошибка: Укажите тип базы данных");
    console.log("");
    console.log("Использование:");
    console.log(
      "  node scripts/switch-db.js sqlite    # Переключиться на SQLite"
    );
    console.log(
      "  node scripts/switch-db.js postgres  # Переключиться на PostgreSQL"
    );
    process.exit(1);
  }

  console.log(`🔄 Переключение на ${dbType.toUpperCase()}...`);

  try {
    // Обновляем схему Prisma
    updateSchema(dbType);
    console.log("✅ Обновлена схема Prisma");

    // Обновляем .env файл
    updateEnv(dbType);
    console.log("✅ Обновлен .env файл");

    console.log("");
    console.log(`🎉 Успешно переключено на ${dbType.toUpperCase()}!`);
    console.log("");
    console.log("Следующие шаги:");

    if (dbType === "postgres") {
      console.log("1. Запустите PostgreSQL:");
      console.log("   docker-compose up postgres -d");
      console.log("");
      console.log("2. Примените миграции:");
      console.log("   npx prisma migrate deploy");
      console.log("");
      console.log("3. Перегенерируйте Prisma клиент:");
      console.log("   npx prisma generate");
    } else {
      console.log("1. Примените миграции:");
      console.log("   npx prisma migrate deploy");
      console.log("");
      console.log("2. Перегенерируйте Prisma клиент:");
      console.log("   npx prisma generate");
    }
  } catch (error) {
    console.error("❌ Ошибка переключения:", error.message);
    process.exit(1);
  }
}

main();
