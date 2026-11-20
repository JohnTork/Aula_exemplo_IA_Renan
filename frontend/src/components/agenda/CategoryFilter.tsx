import { CATEGORIES, type Category } from "@/lib/tasks";

export function CategoryFilter({ value, onChange }: { value: Category | ""; onChange: (v: Category | "") => void }) {
  return (
    <div>
      <label htmlFor="filter-category" className="sr-only">Filtrar por categoria</label>
      <select id="filter-category" className="field" value={value} onChange={(e) => onChange(e.target.value as Category | "")}>
        <option value="">Todas as categorias</option>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
