import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Очищаем существующие данные
  await prisma.pingHistory.deleteMany();
  await prisma.device.deleteMany();
  await prisma.deviceFolder.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.systemMetrics.deleteMany();
  await prisma.appSettings.deleteMany();

  // Создаем 10 папок
  const folders = [];
  for (let i = 0; i < 10; i++) {
    const folder = await prisma.deviceFolder.create({
      data: {
        name: faker.word.noun(),
        color: faker.internet.color(),
      },
    });
    folders.push(folder);
  }

  // Создаем 10 устройств
  const devices = [];
  for (let i = 0; i < 10; i++) {
    const device = await prisma.device.create({
      data: {
        name: faker.internet.domainWord(),
        ip: faker.internet.ip(),
        type: faker.helpers.arrayElement([
          "router",
          "switch",
          "server",
          "workstation",
        ]),
        location: faker.location.city(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(["online", "offline", "warning"]),
        responseTime: faker.number.int({ min: 1, max: 1000 }),
        uptime: faker.number.float({ min: 0, max: 100 }),
        folderId: folders[faker.number.int({ min: 0, max: 9 })]?.id || null,
        mac: faker.internet.mac(),
        vendor: faker.company.name(),
        model: faker.commerce.product(),
        osVersion: faker.system.semver(),
        monitoringPing: true,
        monitoringSnmp: faker.datatype.boolean(),
        monitoringHttp: faker.datatype.boolean(),
        monitoringSsh: faker.datatype.boolean(),
      },
    });
    devices.push(device);
  }

  // Создаем 10 записей истории пингов для каждого устройства
  for (const device of devices) {
    for (let i = 0; i < 10; i++) {
      await prisma.pingHistory.create({
        data: {
          deviceId: device.id,
          isAlive: faker.datatype.boolean(),
          responseTime: faker.number.int({ min: 1, max: 1000 }),
          packetLoss: faker.number.int({ min: 0, max: 100 }).toString() + "%",
          errorMessage: faker.datatype.boolean()
            ? faker.lorem.sentence()
            : null,
        },
      });
    }
  }

  // Создаем 10 пользователей
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(["admin", "user", "viewer"]),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        settings: {
          create: {
            theme: faker.helpers.arrayElement(["dark", "light"]),
            language: faker.helpers.arrayElement(["ru", "en"]),
            timezone: faker.location.timeZone(),
            emailNotifications: faker.datatype.boolean(),
            pushNotifications: faker.datatype.boolean(),
            alertThreshold: faker.number.int({ min: 1000, max: 10000 }),
            refreshInterval: faker.number.int({ min: 5000, max: 60000 }),
            defaultView: faker.helpers.arrayElement(["grid", "list"]),
          },
        },
      },
    });
    users.push(user);
  }

  // Создаем 10 системных метрик
  for (let i = 0; i < 10; i++) {
    await prisma.systemMetrics.create({
      data: {
        cpuUsage: faker.number.float({ min: 0, max: 100 }),
        cpuCores: faker.number.int({ min: 2, max: 32 }),
        cpuModel: faker.system.semver(),
        memoryUsage: faker.number.float({ min: 0, max: 100 }),
        memoryUsed: faker.number.float({ min: 1000, max: 16000 }),
        memoryTotal: 16000,
        networkInterfaces: faker.number.int({ min: 1, max: 8 }),
        totalRx: faker.number.float({ min: 0, max: 1000000 }),
        totalTx: faker.number.float({ min: 0, max: 1000000 }),
        uptime: faker.number.int({ min: 0, max: 2592000 }),
        temperature: faker.number.float({ min: 20, max: 80 }),
        processes: faker.number.int({ min: 100, max: 1000 }),
      },
    });
  }

  // Создаем 10 алертов
  for (let i = 0; i < 10; i++) {
    await prisma.alert.create({
      data: {
        type: faker.helpers.arrayElement(["error", "warning", "info"]),
        severity: faker.helpers.arrayElement(["high", "medium", "low"]),
        title: faker.lorem.sentence(),
        message: faker.lorem.paragraph(),
        deviceId: devices[faker.number.int({ min: 0, max: 9 })]?.id || null,
        isResolved: faker.datatype.boolean(),
        resolvedAt: faker.datatype.boolean() ? faker.date.past() : null,
        resolvedBy: faker.datatype.boolean()
          ? users[faker.number.int({ min: 0, max: 9 })]?.id || null
          : null,
      },
    });
  }

  // Создаем 10 настроек приложения
  for (let i = 0; i < 10; i++) {
    await prisma.appSettings.create({
      data: {
        key: faker.lorem.word(),
        value: faker.lorem.word(),
        type: faker.helpers.arrayElement(["string", "number", "boolean"]),
        description: faker.lorem.sentence(),
        isPublic: faker.datatype.boolean(),
        updatedBy: users[faker.number.int({ min: 0, max: 9 })]?.id || null,
      },
    });
  }

  console.log("Seed данные успешно созданы");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
