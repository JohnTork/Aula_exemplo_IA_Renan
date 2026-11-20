import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";
import type { Status } from "@/lib/tasks";

const map = {
  Pendente: { cls: "bg-warning-soft text-warning", Icon: Clock3 },
  "Em andamento": { cls: "bg-progress-soft text-progress", Icon: CircleDashed },
  Concluída: { cls: "bg-success-soft text-success", Icon: CheckCircle2 },
} as const;

export function StatusBadge({ status }: { status: Status }) {
  const { cls, Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden /> {status}
    </span>
  );
}
