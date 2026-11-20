import { useEffect, useState } from "react";
import { demoTasks, type Task, type TaskInput } from "@/lib/tasks";

const KEY = "minha-agenda:tarefas";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setTasks(raw ? (JSON.parse(raw) as Task[]) : demoTasks());
    } catch {
      setTasks(demoTasks());
    }
    setLoaded(true);
  }, []);

  function persist(next: Task[]) {
    localStorage.setItem(KEY, JSON.stringify(next)); // throws if storage fails; caller shows error
    setTasks(next);
  }

  return {
    tasks, loaded,
    create: (t: TaskInput) => persist([...tasks, { ...t, id: crypto.randomUUID() }]),
    update: (id: string, t: Partial<TaskInput>) => persist(tasks.map((x) => (x.id === id ? { ...x, ...t } : x))),
    remove: (id: string) => persist(tasks.filter((x) => x.id !== id)),
  };
}
