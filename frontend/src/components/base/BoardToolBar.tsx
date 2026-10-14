import { ListFilter, Plus } from "lucide-react";

export default function BoardToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm text-white">
          <span className="h-2 w-2 rounded-full bg-lime-400" />
          Status: Active
        </div>

        <div className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-500">
          WIP limit: <span className="font-semibold text-slate-700">2</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-500">
          Owner: <span className="font-semibold text-slate-700">You</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
          <ListFilter size={17} />
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-linear-to-r from-fuchsia-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:brightness-110">
          <Plus size={17} />
          Quick add
        </button>
      </div>
    </div>
  );
}
