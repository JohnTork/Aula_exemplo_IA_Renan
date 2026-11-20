import { STATUSES, type Status } from "@/lib/tasks";

export function StatusFilter({ value, onChange }: { value: Status | ""; onChange: (v: Status | "") => void }) {
  return (
    <div>
      <label htmlFor="filter-status" className="sr-only">Filtrar por status</label>
      <select id="filter-status" className="field" value={value} onChange={(e) => onChange(e.target.value as Status | "")}>
        <option value="">Todos os status</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}
