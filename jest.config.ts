import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Используем ts-jest для поддержки TypeScript
  testEnvironment: "jsdom", // Окружение для тестирования (подходит для React)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Поддержка алиасов, если они используются
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Файл с настройками после инициализации Jest
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Преобразование TypeScript файлов
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // Паттерн для поиска тестовых файлов
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Расширения файлов, которые Jest будет обрабатывать
};

export default config;
