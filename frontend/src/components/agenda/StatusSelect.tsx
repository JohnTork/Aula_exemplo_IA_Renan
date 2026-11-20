import { STATUSES, type Status } from "@/lib/tasks";

export function StatusSelect({ id, value, onChange, label }: { id: string; value: Status; onChange: (s: Status) => void; label: string }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as Status)}
        className="field min-h-9 w-auto py-1 text-sm">
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </>
  );
}
