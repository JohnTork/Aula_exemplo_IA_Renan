import { taskService } from "../service/taskService.js";

function sendError(next, error) {
  next(error);
}

export const taskController = {
  async list(req, res, next) {
    try {
      res.json(await taskService.list({
        search: req.query.search,
        category: req.query.category,
        status: req.query.status
      }));
    } catch (error) {
      sendError(next, error);
    }
  },

  async getById(req, res, next) {
    try {
      res.json(await taskService.getById(req.params.id));
    } catch (error) {
      sendError(next, error);
    }
  },

  async create(req, res, next) {
    try {
      const task = await taskService.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      sendError(next, error);
    }
  },

  async update(req, res, next) {
    try {
      res.json(await taskService.update(req.params.id, req.body));
    } catch (error) {
      sendError(next, error);
    }
  },

  async remove(req, res, next) {
    try {
      await taskService.remove(req.params.id);
      res.status(204).send();
    } catch (error) {
      sendError(next, error);
    }
  }
};
