import { describe, it, expect } from "vitest";
import { filterTasks, sortByDate, summarize, validateTask, type Task } from "./tasks";

const base: Task = { id: "1", title: "Aula de Inglês", description: "", category: "Aulas", date: "2026-01-02", time: "10:00", status: "Pendente" };
const tasks: Task[] = [
  base,
  { ...base, id: "2", title: "Compras", category: "Compras", date: "2026-01-01", status: "Concluída" },
  { ...base, id: "3", title: "Estudar", category: "Estudos", date: "2026-01-02", time: "08:00", status: "Em andamento" },
];

describe("tarefas", () => {
  it("ordena pelas mais próximas primeiro", () => expect(sortByDate(tasks).map((t) => t.id)).toEqual(["2", "3", "1"]));
  it("pesquisa pelo título sem diferenciar maiúsculas", () => expect(filterTasks(tasks, { search: "inglês", category: "", status: "" }).map((t) => t.id)).toEqual(["1"]));
  it("filtra por categoria e status", () => {
    expect(filterTasks(tasks, { search: "", category: "Compras", status: "" }).map((t) => t.id)).toEqual(["2"]);
    expect(filterTasks(tasks, { search: "", category: "", status: "Em andamento" }).map((t) => t.id)).toEqual(["3"]);
  });
  it("indicadores: pendentes = não concluídas", () => expect(summarize(tasks)).toEqual({ total: 3, pending: 2, done: 1 }));
  it("valida campos obrigatórios, descrição opcional", () => {
    const e = validateTask({ title: " ", description: "", category: "" as never, date: "", time: "", status: "" as never });
    expect(Object.keys(e).sort()).toEqual(["category", "date", "status", "time", "title"]);
  });
});
