import { taskModel } from "../model/taskModel.js";

export const CATEGORIES = ["Estudos", "Aulas", "Compromissos", "Compras", "Visitas", "Outros"];
export const STATUSES = ["Pendente", "Em andamento", "Concluída"];

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function validateTask(input, { partial = false } = {}) {
  const errors = {};
  const fields = ["title", "description", "category", "date", "time", "status"];

  if (!partial) {
    for (const field of fields.filter((field) => field !== "description")) {
      if (input[field] === undefined || input[field] === null || input[field] === "") {
        errors[field] = `Informe ${field}.`;
      }
    }
  }

  if (input.title !== undefined) {
    if (typeof input.title !== "string" || !input.title.trim()) errors.title = "Informe o título da tarefa.";
  }
  if (input.description !== undefined && typeof input.description !== "string") {
    errors.description = "A descrição deve ser um texto.";
  }
  if (input.category !== undefined && !CATEGORIES.includes(input.category)) {
    errors.category = "Categoria inválida.";
  }
  if (input.status !== undefined && !STATUSES.includes(input.status)) {
    errors.status = "Status inválido.";
  }
  if (input.date !== undefined && (!isValidDate(input.date) || Number.isNaN(Date.parse(`${input.date}T00:00:00`)))) {
    errors.date = "A data deve estar no formato YYYY-MM-DD.";
  }
  if (input.time !== undefined && !isValidTime(input.time)) {
    errors.time = "O horário deve estar no formato HH:mm.";
  }

  return errors;
}

function httpError(status, message, errors) {
  const error = new Error(message);
  error.status = status;
  if (errors) error.errors = errors;
  return error;
}

export const taskService = {
  async list(filters) {
    return await taskModel.list(filters);
  },

  async getById(id) {
    const task = await taskModel.findById(id);
    if (!task) throw httpError(404, "Tarefa não encontrada.");
    return task;
  },

  async create(input) {
    const clean = {
      title: typeof input.title === "string" ? input.title.trim() : input.title,
      description: typeof input.description === "string" ? input.description.trim() : input.description ?? "",
      category: input.category,
      date: input.date,
      time: input.time,
      status: input.status
    };
    const errors = validateTask(clean);
    if (Object.keys(errors).length) throw httpError(400, "Dados inválidos.", errors);
    return await taskModel.create(clean);
  },

  async update(id, input) {
    await this.getById(id);
    const clean = {};
    for (const field of ["title", "description", "category", "date", "time", "status"]) {
      if (Object.prototype.hasOwnProperty.call(input, field)) {
        clean[field] = typeof input[field] === "string" ? input[field].trim() : input[field];
      }
    }
    if (!Object.keys(clean).length) throw httpError(400, "Nenhum campo foi enviado para atualização.");

    const errors = validateTask(clean, { partial: true });
    if (Object.keys(errors).length) throw httpError(400, "Dados inválidos.", errors);
    const updated = await taskModel.update(id, clean);
    if (!updated) throw httpError(404, "Tarefa não encontrada.");
    return updated;
  },

  async remove(id) {
    await this.getById(id);
    await taskModel.remove(id);
  }
};
