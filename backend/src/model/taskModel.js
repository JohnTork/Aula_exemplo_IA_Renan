import { randomUUID } from "node:crypto";
import { Op } from "sequelize";
import database from "../config/database.js";

const Task = database.db.define("task", {
  id: {
    type: database.db.Sequelize.STRING,
    primaryKey: true,
    defaultValue: randomUUID
  },
  title: { type: database.db.Sequelize.STRING, allowNull: false },
  description: { type: database.db.Sequelize.TEXT, allowNull: false, defaultValue: "" },
  category: { type: database.db.Sequelize.STRING, allowNull: false },
  date: { type: database.db.Sequelize.STRING, allowNull: false },
  time: { type: database.db.Sequelize.STRING, allowNull: false },
  status: { type: database.db.Sequelize.STRING, allowNull: false, defaultValue: "Pendente" }
});

export const taskModel = {
  async list({ search = "", category = "", status = "" } = {}) {
    const where = {};
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (category) where.category = category;
    if (status) where.status = status;

    const tasks = await Task.findAll({
      where,
      order: [["date", "ASC"], ["time", "ASC"]]
    });
    return tasks.map((task) => task.toJSON());
  },

  async findById(id) {
    const task = await Task.findByPk(id);
    return task ? task.toJSON() : null;
  },

  async create(task) {
    const created = await Task.create({
      id: randomUUID(),
      description: "",
      ...task
    });
    return created.toJSON();
  },

  async update(id, changes) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.update(changes);
    return task.toJSON();
  },

  async remove(id) {
    return (await Task.destroy({ where: { id } })) > 0;
  }
};
