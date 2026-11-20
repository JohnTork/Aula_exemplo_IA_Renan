import { Search } from "lucide-react";

export function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">Pesquisar por título</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input id="search" type="search" className="field pl-9" placeholder="Pesquisar por título..." value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
