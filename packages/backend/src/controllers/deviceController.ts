// Этот файл остается для совместимости и может содержать дополнительную логику
// Основной функционал перенесен в специализированные контроллеры:
// - deviceCrudController.ts - CRUD операции
// - pingController.ts - ping операции  
// - networkController.ts - сканирование сети
// - bulkController.ts - bulk операции

export * from "./deviceCrudController";
export * from "./pingController";
export * from "./networkController";
export * from "./bulkController";

// Здесь можно добавить дополнительные функции если потребуется