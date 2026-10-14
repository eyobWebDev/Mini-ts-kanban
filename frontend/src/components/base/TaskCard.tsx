
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/store/useTaskStore";
import { ChevronRight } from "lucide-react";

type TaskCardProps = {
  task: Task
}

export default function TaskCard({task}: TaskCardProps) {
  return (
    <Card className="gap-3 rounded-2xl border border-slate-200/80 bg-white/90 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <CardContent className="space-y-3 px-4">
        {/* Title and priority */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm leading-5 font-bold text-slate-900">
            {task.title}
          </h3>

          <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
            {task.priority}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-5 text-slate-600">
         {task.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Errands
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Home
          </span>
        </div>

        {/* Due date and estimate */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Due: Today
          </span>
          <span>Est: 45m</span>
        </div>

        {/* Avatars and open button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex -space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-fuchsia-600 text-xs font-bold text-white">
              F
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-cyan-600 text-xs font-bold text-white">
              A
            </div>
          </div>

          <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            Open
            <ChevronRight size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
