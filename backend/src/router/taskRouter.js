import { Router } from "express";
import { taskController } from "../controller/taskController.js";

const router = Router();

router.get("/", taskController.list);
router.post("/", taskController.create);
router.get("/:id", taskController.getById);
router.put("/:id", taskController.update);
router.patch("/:id", taskController.update);
router.delete("/:id", taskController.remove);

export default router;
