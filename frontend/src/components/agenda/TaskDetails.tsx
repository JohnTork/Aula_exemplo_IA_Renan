import { CalendarDays, Clock, Pencil, Tag, Trash2 } from "lucide-react";
import { formatDate, type Status, type Task } from "@/lib/tasks";
import { StatusBadge } from "./StatusBadge";
import { StatusSelect } from "./StatusSelect";

export function TaskDetails({ task, onEdit, onDelete, onStatus }: { task: Task; onEdit: () => void; onDelete: () => void; onStatus: (s: Status) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={task.status} />
        {task.demo && <span className="rounded-full border border-dashed border-input px-2 py-0.5 text-xs text-muted-foreground">Dado de demonstração</span>}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground">Descrição</h3>
        <p className="mt-1 whitespace-pre-wrap">{task.description || "Sem descrição."}</p>
      </div>
      <dl className="grid grid-cols-1 gap-3 rounded-xl bg-muted p-4 sm:grid-cols-3">
        <div><dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Tag className="h-3.5 w-3.5" aria-hidden />Categoria</dt><dd className="font-semibold">{task.category}</dd></div>
        <div><dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" aria-hidden />Data</dt><dd className="font-semibold capitalize">{formatDate(task.date)}</dd></div>
        <div><dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" aria-hidden />Horário</dt><dd className="font-semibold">{task.time}</dd></div>
      </dl>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Status:</span>
        <StatusSelect id="details-status" value={task.status} onChange={onStatus} label="Alterar status" />
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" aria-hidden />Excluir</button>
        <button type="button" className="btn btn-primary" onClick={onEdit}><Pencil className="h-4 w-4" aria-hidden />Editar</button>
      </div>
    </div>
  );
}
