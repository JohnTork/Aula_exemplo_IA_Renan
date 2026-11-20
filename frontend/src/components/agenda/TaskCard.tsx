import { CalendarDays, Clock, Eye, Pencil, Tag, Trash2 } from "lucide-react";
import { formatDate, type Status, type Task } from "@/lib/tasks";
import { StatusBadge } from "./StatusBadge";
import { StatusSelect } from "./StatusSelect";

export function TaskCard({ task, onView, onEdit, onDelete, onStatus }: {
  task: Task; onView: () => void; onEdit: () => void; onDelete: () => void; onStatus: (s: Status) => void;
}) {
  const done = task.status === "Concluída";
  return (
    <article className="card-surface flex h-full flex-col p-5 transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={task.status} />
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          <Tag className="h-3 w-3" aria-hidden /> {task.category}
        </span>
        {task.demo && <span className="rounded-full border border-dashed border-input px-2 py-0.5 text-xs text-muted-foreground">Demonstração</span>}
      </div>
      <h3 className={`mt-3 text-lg font-semibold leading-snug ${done ? "text-muted-foreground line-through" : ""}`}>{task.title}</h3>
      {task.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{task.description}</p>}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 capitalize"><CalendarDays className="h-4 w-4" aria-hidden />{formatDate(task.date)}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden />{task.time}</span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4 mt-4">
        <StatusSelect id={`status-${task.id}`} value={task.status} onChange={onStatus} label={`Alterar status de ${task.title}`} />
        <div className="flex">
          <button type="button" className="icon-btn" onClick={onView} aria-label={`Ver detalhes de ${task.title}`} title="Detalhes"><Eye className="h-5 w-5" /></button>
          <button type="button" className="icon-btn" onClick={onEdit} aria-label={`Editar ${task.title}`} title="Editar"><Pencil className="h-5 w-5" /></button>
          <button type="button" className="icon-btn hover:text-destructive" onClick={onDelete} aria-label={`Excluir ${task.title}`} title="Excluir"><Trash2 className="h-5 w-5" /></button>
        </div>
      </div>
    </article>
  );
}
