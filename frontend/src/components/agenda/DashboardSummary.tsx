import { CheckCircle2, Clock3, ListTodo } from "lucide-react";

export function DashboardSummary({ total, pending, done }: { total: number; pending: number; done: number }) {
  const items = [
    { label: "Total de tarefas", value: total, Icon: ListTodo, cls: "bg-accent text-accent-foreground" },
    { label: "Tarefas pendentes", value: pending, Icon: Clock3, cls: "bg-warning-soft text-warning", hint: "Inclui as em andamento" },
    { label: "Tarefas concluídas", value: done, Icon: CheckCircle2, cls: "bg-success-soft text-success" },
  ];
  return (
    <section aria-label="Resumo de atividades" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(({ label, value, Icon, cls, hint }) => (
        <div key={label} className="card-surface flex items-center gap-4 p-5">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cls}`} aria-hidden>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold" aria-live="polite">{value}</p>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          </div>
        </div>
      ))}
    </section>
  );
}
