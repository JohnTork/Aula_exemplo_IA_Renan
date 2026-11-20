import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarPlus, FilterX, Info, SearchX } from "lucide-react";
import { filterTasks, sortByDate, summarize, type Filters, type Status, type Task, type TaskInput } from "@/lib/tasks";
import { useTasks } from "@/components/agenda/use-tasks";
import { Header } from "@/components/agenda/Header";
import { DashboardSummary } from "@/components/agenda/DashboardSummary";
import { SearchInput } from "@/components/agenda/SearchInput";
import { CategoryFilter } from "@/components/agenda/CategoryFilter";
import { StatusFilter } from "@/components/agenda/StatusFilter";
import { TaskList } from "@/components/agenda/TaskList";
import { TaskForm } from "@/components/agenda/TaskForm";
import { TaskDetails } from "@/components/agenda/TaskDetails";
import { ConfirmationModal } from "@/components/agenda/ConfirmationModal";
import { EmptyState } from "@/components/agenda/EmptyState";
import { Modal } from "@/components/agenda/Modal";
import { ToastNotification, notify } from "@/components/agenda/ToastNotification";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minha Agenda — Organizador pessoal de tarefas" },
      { name: "description", content: "Organize estudos, aulas, compromissos, compras e visitas em um só lugar." },
      { property: "og:title", content: "Minha Agenda — Organizador pessoal de tarefas" },
      { property: "og:description", content: "Organize estudos, aulas, compromissos, compras e visitas em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const noFilters: Filters = { search: "", category: "", status: "" };

function Index() {
  const { tasks, loaded, create, update, remove } = useTasks();
  const [filters, setFilters] = useState<Filters>(noFilters);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  const visible = useMemo(() => sortByDate(filterTasks(tasks, filters)), [tasks, filters]);
  const summary = summarize(tasks);
  const viewing = tasks.find((t) => t.id === viewingId) ?? null;
  const hasFilters = filters.search || filters.category || filters.status;
  const hasDemo = tasks.some((t) => t.demo);

  const safe = (fn: () => void, ok: string) => {
    try { fn(); notify.success(ok); return true; }
    catch { notify.error("Não foi possível concluir a operação. Tente novamente."); return false; }
  };

  const openNew = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (t: Task) => { setViewingId(null); setEditing(t); setFormOpen(true); };
  const askDelete = (t: Task) => { setViewingId(null); setDeleting(t); };

  function save(input: TaskInput) {
    const ok = editing
      ? safe(() => update(editing.id, input), "Tarefa atualizada com sucesso!")
      : safe(() => create(input), "Tarefa cadastrada com sucesso!");
    if (ok) setFormOpen(false);
  }
  const changeStatus = (t: Task, s: Status) => safe(() => update(t.id, { status: s }), `Status alterado para "${s}".`);

  return (
    <div className="min-h-screen">
      <ToastNotification />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <Header onNew={openNew} />
        <DashboardSummary {...summary} />

        <section aria-labelledby="tasks-title" className="space-y-4">
          <div className="flex items-end justify-between gap-2">
            <h2 id="tasks-title" className="text-xl font-bold">Suas tarefas</h2>
            {tasks.length > 0 && <p className="text-sm text-muted-foreground">{visible.length} de {tasks.length}</p>}
          </div>

          {hasDemo && (
            <p className="flex items-start gap-2 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              As tarefas marcadas como "Demonstração" são dados de exemplo. Você pode editá-las ou excluí-las livremente.
            </p>
          )}

          <div className="card-surface grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px_auto]" role="search">
            <div className="sm:col-span-2 lg:col-span-1"><SearchInput value={filters.search} onChange={(search) => setFilters((f) => ({ ...f, search }))} /></div>
            <CategoryFilter value={filters.category} onChange={(category) => setFilters((f) => ({ ...f, category }))} />
            <StatusFilter value={filters.status} onChange={(status) => setFilters((f) => ({ ...f, status }))} />
            <button type="button" className="btn btn-secondary sm:col-span-2 lg:col-span-1" onClick={() => setFilters(noFilters)} disabled={!hasFilters}>
              <FilterX className="h-4 w-4" aria-hidden /> Limpar filtros
            </button>
          </div>

          {!loaded ? null : tasks.length === 0 ? (
            <EmptyState icon={<CalendarPlus className="h-7 w-7" />} title="Nenhuma tarefa por aqui"
              description="Cadastre sua primeira atividade e comece a organizar sua rotina."
              action={<button type="button" className="btn btn-primary" onClick={openNew}>Cadastrar primeira tarefa</button>} />
          ) : visible.length === 0 ? (
            <EmptyState icon={<SearchX className="h-7 w-7" />} title="Nenhum resultado encontrado"
              description="Nenhuma tarefa corresponde à pesquisa ou aos filtros selecionados."
              action={<button type="button" className="btn btn-secondary" onClick={() => setFilters(noFilters)}>Limpar filtros</button>} />
          ) : (
            <TaskList tasks={visible} onView={(t) => setViewingId(t.id)} onEdit={openEdit} onDelete={askDelete} onStatus={changeStatus} />
          )}
        </section>
      </main>

      <Modal open={formOpen} onOpenChange={setFormOpen} title={editing ? "Editar tarefa" : "Nova tarefa"}
        description={editing ? "Altere as informações e salve." : "Preencha os dados da sua atividade."}>
        <TaskForm key={editing?.id ?? "new"} initial={editing ?? undefined} isEdit={!!editing} onSubmit={save} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal open={!!viewing} onOpenChange={(o) => !o && setViewingId(null)} title={viewing?.title ?? ""}>
        {viewing && <TaskDetails task={viewing} onEdit={() => openEdit(viewing)} onDelete={() => askDelete(viewing)} onStatus={(s) => changeStatus(viewing, s)} />}
      </Modal>

      <ConfirmationModal open={!!deleting} taskTitle={deleting?.title} onCancel={() => setDeleting(null)}
        onConfirm={() => { if (deleting && safe(() => remove(deleting.id), "Tarefa excluída com sucesso!")) setDeleting(null); }} />
    </div>
  );
}
