import { useTaskStore } from "@/store/useTaskStore";
import { Check, Ellipsis, List, LoaderCircle } from "lucide-react";
import TaskCard from "./TaskCard";

export default function KanbanBoard() {
  const tasks = useTaskStore((state) => state.tasks)
  const todoTask = tasks.filter(task => task.status === "todo")
  const inProgressTask = tasks.filter(task => task.status === "in-progress")
  const doneTask = tasks.filter(task => task.status === "done")


  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {/* To Do column */}
      <section className="min-h-125 overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-slate-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200/70 bg-amber-100/80 text-amber-700">
              <List size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">To Do</h2>
              <p className="text-sm text-slate-500">Next up</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
              {todoTask.length}
            </span>
            <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
              <Ellipsis size={19} />
            </button>
          </div>
        </header>

        <div className="space-y-3 p-4">
          {todoTask.map(task => {
            return <TaskCard task={task} />
          })}
        </div>
      </section>

      {/* In Progress column */}
      <section className="min-h-125 overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-slate-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200/70 bg-sky-100/80 text-sky-700">
              <LoaderCircle size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">In Progress</h2>
              <p className="text-sm text-slate-500">Keep WIP small</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
              {inProgressTask.length}
            </span>
            <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
              <Ellipsis size={19} />
            </button>
          </div>
        </header>

        <div className="space-y-3 p-4">
          {/* Add your In Progress task cards here */}
          {inProgressTask.map(task => {
            return <TaskCard task={task} />
          })}

          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-600">
                <Check size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  WIP reminder
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Finishing beats starting. Try keeping “In Progress” at 2 or
                  less.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Done column */}
      <section className="min-h-125 overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-slate-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200/70 bg-emerald-100/80 text-emerald-700">
              <Check size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Done</h2>
              <p className="text-sm text-slate-500">Shipped &amp; closed</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
              {doneTask.length}
            </span>
            <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
              <Ellipsis size={19} />
            </button>
          </div>
        </header>

        <div className="space-y-3 p-4">
          {/* Add your Done task cards here */}
          {doneTask.map(task => {
            return <TaskCard task={task} />
          })}

          <button className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 px-4 py-5 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-white/80">
            Archive completed tasks
          </button>
        </div>
      </section>
    </div>
  );
}
