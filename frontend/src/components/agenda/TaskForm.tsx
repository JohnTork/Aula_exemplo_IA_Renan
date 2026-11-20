import { useState, type FormEvent } from "react";
import { CATEGORIES, STATUSES, validateTask, type TaskErrors, type TaskInput } from "@/lib/tasks";

const empty: TaskInput = { title: "", description: "", category: "" as TaskInput["category"], date: "", time: "", status: "Pendente" };

export function TaskForm({ initial, isEdit, onSubmit, onCancel }: { initial?: TaskInput | undefined; isEdit?: boolean; onSubmit: (t: TaskInput) => void; onCancel: () => void }) {
  const [v, setV] = useState<TaskInput>(initial ?? empty);
  const [errors, setErrors] = useState<TaskErrors>({});
  const set = <K extends keyof TaskInput>(k: K, val: TaskInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateTask(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    onSubmit({ ...v, title: v.title.trim(), description: v.description.trim() });
  }

  const err = (k: keyof TaskInput) => errors[k] && <p id={`e-${k}`} className="mt-1 text-sm font-medium text-destructive">{errors[k]}</p>;
  const a = (k: keyof TaskInput) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });
  const Label = ({ k, children, req = true }: { k: string; children: string; req?: boolean }) => (
    <label htmlFor={`f-${k}`} className="mb-1.5 block text-sm font-semibold">{children}{req ? <span className="text-destructive" aria-hidden> *</span> : <span className="font-normal text-muted-foreground"> (opcional)</span>}</label>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div><Label k="title">Título</Label><input {...a("title")} className="field" value={v.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex.: Estudar para a prova" required />{err("title")}</div>
      <div><Label k="description" req={false}>Descrição</Label><textarea id="f-description" className="field min-h-24 resize-y" value={v.description} onChange={(e) => set("description", e.target.value)} placeholder="Detalhes da tarefa" /></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label k="category">Categoria</Label>
          <select {...a("category")} className="field" value={v.category} onChange={(e) => set("category", e.target.value as TaskInput["category"])} required>
            <option value="">Selecione...</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>{err("category")}</div>
        <div><Label k="status">Status</Label>
          <select {...a("status")} className="field" value={v.status} onChange={(e) => set("status", e.target.value as TaskInput["status"])} required>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>{err("status")}</div>
        <div><Label k="date">Data</Label><input {...a("date")} type="date" className="field" value={v.date} onChange={(e) => set("date", e.target.value)} required />{err("date")}</div>
        <div><Label k="time">Horário</Label><input {...a("time")} type="time" className="field" value={v.time} onChange={(e) => set("time", e.target.value)} required />{err("time")}</div>
      </div>
      <p className="text-xs text-muted-foreground"><span className="text-destructive">*</span> Campos obrigatórios</p>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{isEdit ? "Salvar alterações" : "Salvar tarefa"}</button>
      </div>
    </form>
  );
}
