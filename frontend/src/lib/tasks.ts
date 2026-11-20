export const CATEGORIES = ["Estudos", "Aulas", "Compromissos", "Compras", "Visitas", "Outros"] as const;
export const STATUSES = ["Pendente", "Em andamento", "Concluída"] as const;
export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: Status;
  demo?: boolean;
}

export type TaskInput = Omit<Task, "id" | "demo">;

function offsetDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function demoTasks(): Task[] {
  return [
    { id: "demo-1", title: "Revisar matéria de Cálculo", description: "Revisar derivadas e integrais para a prova da próxima semana. Fazer os exercícios do capítulo 4.", category: "Estudos", date: offsetDate(0), time: "19:00", status: "Em andamento", demo: true },
    { id: "demo-2", title: "Aula de Inglês", description: "Aula online com a professora Ana. Levar as dúvidas sobre phrasal verbs.", category: "Aulas", date: offsetDate(1), time: "08:30", status: "Pendente", demo: true },
    { id: "demo-3", title: "Consulta no dentista", description: "Limpeza semestral na Clínica Sorriso.", category: "Compromissos", date: offsetDate(2), time: "14:00", status: "Pendente", demo: true },
    { id: "demo-4", title: "Compras do mês", description: "Arroz, feijão, frutas, café, produtos de limpeza.", category: "Compras", date: offsetDate(3), time: "10:00", status: "Pendente", demo: true },
    { id: "demo-5", title: "Visitar os avós", description: "Almoço de domingo na casa dos avós.", category: "Visitas", date: offsetDate(5), time: "12:00", status: "Pendente", demo: true },
    { id: "demo-6", title: "Entregar trabalho de História", description: "Trabalho sobre a Revolução Industrial já enviado pela plataforma.", category: "Estudos", date: offsetDate(-1), time: "23:59", status: "Concluída", demo: true },
  ];
}

export function sortByDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

export interface Filters { search: string; category: Category | ""; status: Status | "" }

export function filterTasks(tasks: Task[], f: Filters): Task[] {
  const q = f.search.trim().toLocaleLowerCase("pt-BR");
  return tasks.filter(
    (t) =>
      (!q || t.title.toLocaleLowerCase("pt-BR").includes(q)) &&
      (!f.category || t.category === f.category) &&
      (!f.status || t.status === f.status),
  );
}

export function summarize(tasks: Task[]) {
  return {
    total: tasks.length,
    pending: tasks.filter((t) => t.status !== "Concluída").length,
    done: tasks.filter((t) => t.status === "Concluída").length,
  };
}

export type TaskErrors = Partial<Record<keyof TaskInput, string>>;

export function validateTask(t: TaskInput): TaskErrors {
  const e: TaskErrors = {};
  if (!t.title.trim()) e.title = "Informe o título da tarefa.";
  if (!t.category) e.category = "Selecione uma categoria.";
  if (!t.date) e.date = "Informe a data.";
  if (!t.time) e.time = "Informe o horário.";
  if (!t.status) e.status = "Selecione um status.";
  return e;
}

export function formatDate(date: string) {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}
