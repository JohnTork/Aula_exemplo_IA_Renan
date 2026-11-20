import type { Status, Task } from "@/lib/tasks";
import { TaskCard } from "./TaskCard";

export function TaskList({ tasks, onView, onEdit, onDelete, onStatus }: {
  tasks: Task[]; onView: (t: Task) => void; onEdit: (t: Task) => void; onDelete: (t: Task) => void; onStatus: (t: Task, s: Status) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((t) => (
        <li key={t.id}>
          <TaskCard task={t} onView={() => onView(t)} onEdit={() => onEdit(t)} onDelete={() => onDelete(t)} onStatus={(s) => onStatus(t, s)} />
        </li>
      ))}
    </ul>
  );
}
