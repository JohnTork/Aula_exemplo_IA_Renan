import { Modal } from "./Modal";

export function ConfirmationModal({ open, onCancel, onConfirm, taskTitle }: { open: boolean; onCancel: () => void; onConfirm: () => void; taskTitle?: string | undefined }) {
  return (
    <Modal open={open} onOpenChange={(o) => !o && onCancel()} size="sm" title="Excluir tarefa?"
      description={`A tarefa "${taskTitle ?? ""}" será removida permanentemente. Essa ação não pode ser desfeita.`}>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>Excluir</button>
      </div>
    </Modal>
  );
}
