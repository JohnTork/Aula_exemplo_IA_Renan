import { CalendarCheck, Plus } from "lucide-react";

export function Header({ onNew }: { onNew: () => void }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
          <CalendarCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Minha Agenda</h1>
          <p className="text-sm text-muted-foreground sm:text-base">Organize seus compromissos e não esqueça o que é importante.</p>
        </div>
      </div>
      <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={onNew}>
        <Plus className="h-5 w-5" aria-hidden /> Nova tarefa
      </button>
    </header>
  );
}
