import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize } from "sequelize";

class Database {
  constructor() {
    this.init();
  }

  init() {
    const dialect = process.env.DB_DIALECT || "sqlite";

    if (dialect === "sqlite") {
      const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
      const dataDirectory = path.resolve(moduleDirectory, "../../data");
      fs.mkdirSync(dataDirectory, { recursive: true });

      this.db = new Sequelize({
        dialect: "sqlite",
        storage: path.join(dataDirectory, process.env.DB_STORAGE || "agenda.sqlite"),
        logging: false
      });
      return;
    }

    if (process.env.DATABASE_URL) {
      this.db = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: process.env.DB_SSL === "true"
          ? { ssl: { require: true, rejectUnauthorized: false } }
          : {}
      });
      return;
    }

    this.db = new Sequelize({
      dialect: "postgres",
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      logging: false,
      dialectOptions: process.env.DB_SSL === "true"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {}
    });
  }
}

const database = new Database();

export function getDatabase() {
  return database.db;
}

export async function closeDatabase() {
  await database.db.close();
}

export default database;
