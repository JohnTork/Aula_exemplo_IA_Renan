import express from "express";
import cors from "cors";
import taskRouter from "./router/taskRouter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();
  const corsOrigin = process.env.CORS_ORIGIN || "*";

  app.use(cors({ origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map((item) => item.trim()) }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/tasks", taskRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
