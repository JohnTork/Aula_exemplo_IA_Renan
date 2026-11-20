import "dotenv/config";
import { createApp } from "./src/index.js";
import database, { closeDatabase } from "./src/config/database.js";

const port = Number(process.env.PORT) || 3001;
const app = createApp();

database.db
  .sync({ force: false })
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Minha Agenda API ouvindo em http://localhost:${port}`);
    });

    for (const signal of ["SIGINT", "SIGTERM"]) {
      process.once(signal, () => {
        server.close(async () => {
          await closeDatabase();
          process.exit(0);
        });
      });
    }
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados:", error.message);
    process.exitCode = 1;
  });
