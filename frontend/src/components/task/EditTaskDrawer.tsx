import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronRight, Save, X } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { type UpdateTaskInput, type Task, useTaskStore } from "@/store/useTaskStore";
import { toast } from "sonner";
import DeleteTaskPromptModal from "./DeleteTaskPromptModal";

type EditDrawerTypeProps = {
    task: Task
}

type ErrorFormType = Partial<Record<keyof UpdateTaskInput, string>>

export default function EditTaskDrawer({task}: EditDrawerTypeProps){
    const {updateTask} = useTaskStore()
    const [formControls, setFormControls] = useState<UpdateTaskInput>({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "todo",
        dueDate: task?.dueDate?.split("T")[0] ?? "",
        priority: task?.priority || "low"
    })
    const [open, setOpen]= useState<boolean>()
    const [formErrors, setFormErrors] = useState<ErrorFormType>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        setFormControls(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const validateForm = () =>{
        const newErrors: ErrorFormType = {}

        if(!formControls.title) newErrors.title = "Title is Required"
        if(!formControls.status) newErrors.title = "Please select status."
        if(!formControls.priority) newErrors.title = "Please select priority"
        if(!formControls.dueDate) newErrors.title = "Please Choose a due date."

        setFormErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if(!validateForm()) return

        updateTask(task.id, formControls)
        setOpen(false)
        toast("Task edited succesfully!")
    }


    return <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
            <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            Open
            <ChevronRight size={14} />
          </button>
        </DrawerTrigger>

        <DrawerContent className={`bg-white min-w-2xl`}>
            <DrawerHeader className="flex items-center justify-between flex-row">
                <DrawerTitle>Edit task</DrawerTitle>
                <DrawerClose><X /></DrawerClose>
            </DrawerHeader>


            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4 p-8">
                    {/* Task title */}
                    <Field className="gap-2">
                        <FieldLabel htmlFor="task-title">Title</FieldLabel>
                        <Input value={formControls.title} name="title" onChange={handleChange} id="task-title" className="border shadow bg-white/45 border-gray-300 pl-2 rounded-xl" placeholder="Enter your title" />
                        <FieldDescription>
                            {formErrors?.title && <div className="text-xs text-red-500">{formErrors.title}</div>}
                        </FieldDescription>
                    </Field>

                    {/* Task description */}
                    <Field className="gap-2">
                        <FieldLabel htmlFor="task-description">Description</FieldLabel>
                        <textarea value={formControls.description} onChange={handleChange} name="description" id="task-description" className="border outline-0 min-h-24 bg-white/45 shadow border-gray-300 p-2 rounded-xl" placeholder="Enter your Description"></textarea>
                    </Field>

                    <div className="flex items-center gap-4">
                        {/* Task status */}
                        <Field>
                            <FieldLabel htmlFor="task-status">Status</FieldLabel>
                            <Select value={formControls.status} onValueChange={(value) => {
                                setFormControls(prev => ({...prev, status: value as UpdateTaskInput["status"]}))
                            }}>
                                <SelectTrigger className="w-full bg-white/45 pl-2 pr-2 rounded-xl shadow">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent className={`bg-gray-200 rounded-xl border border-slate-200 shadow-lg`}>
                                    <SelectItem className={`hover:bg-white/45`} value="todo">To Do</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="in-progress">In Progress</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                {/* {formErrors.status && <div className="text-xs text-red-500">{formErrors.status}</div>} */}
                            </FieldDescription>
                        </Field>

                        {/* Task priority */}
                        <Field>
                            <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                            <Select value={formControls.priority} onValueChange={(value) => {
                                setFormControls(prev => ({...prev, priority: value as UpdateTaskInput["priority"]}))
                            }}>
                                <SelectTrigger className="w-full bg-white/45 pl-2 pr-2 rounded-xl shadow">
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>

                                <SelectContent className={`bg-gray-200 rounded-xl border border-slate-200 shadow-lg`}>
                                    <SelectItem className={`hover:bg-white/45`} value="low">Low</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="medium">Medium</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                {/* {formErrors.priority && <div className="text-xs text-red-500">{formErrors.priority}</div>} */}
                            </FieldDescription>
                        </Field>
                    </div>

                    {/* Task due Date */}
                    <Field className="gap-2">
                        <FieldLabel htmlFor="task-dueDate">Due Date</FieldLabel>
                        <Input value={formControls.dueDate?.split("T")[0] ?? ""}onChange={handleChange} type="date" name="dueDate" id="task-dueDate" className="border pl-2 pr-2 bg-white/45 shadow border-gray-300 rounded-xl" />
                    </Field>
                </div>

                {/* cta buttons */}
                <div className="flex mb-4 items-center justify-end gap-3">
                    <Button onClick={() => setOpen(false)} size={`sm`} variant={`outline`} className={`border cursor-pointer border-gray-400 rounded-xl`}>Cancel</Button>

                    <Button type="submit" size={`sm`} variant={`default`} className={`border cursor-pointer border-gray-400 font-bold bg-green-500 rounded-xl`} onClick={handleSubmit}><Save /> Save Changes</Button>
                    <DeleteTaskPromptModal id={task.id} title={task.title} />
                </div>
            </div>
        </DrawerContent>

    </Drawer>
}