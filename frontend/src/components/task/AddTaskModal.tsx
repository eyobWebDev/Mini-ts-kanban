import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useTaskStore, type CreateTaskInput } from "@/store/useTaskStore";
import { toast } from "sonner";


type FormErrorType = Partial<Record<keyof Omit<CreateTaskInput, "description">, string>>
const initialFormControl: CreateTaskInput = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium"
}

export default function AddTaskModal() {
    const {createTask} = useTaskStore()
    const [formControls, setFormControl] = useState<CreateTaskInput>(initialFormControl)
    const [formErrors, setFormErrorrs] = useState<FormErrorType>({})
    const [open, setOpen] = useState<boolean>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormControl(prev => (
            {...prev, [name]: value}
        ))
    }

    const validateForm = () => {
        const newErrors: FormErrorType = {}

        if(!formControls.title.trim()) newErrors.title = "Title is required."
        if(!formControls.status.trim()) newErrors.status = "Please select status."
        if(!formControls.priority.trim()) newErrors.priority = "Please select priority."

        setFormErrorrs(newErrors) 
        return Object.keys(newErrors).length === 0  
    }

    const handleSubmit = () => {
        if(!validateForm()) return
        console.log("formControls", formControls);

        createTask(formControls)  
        setOpen(false)   
        setFormControl(initialFormControl)
        toast("Task Created Succesfully")   
    }
    
   

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button size={"sm"} className={`bg-black text-white rounded-xl font-bold`}><Plus /> Add task</Button>
        </DialogTrigger>

        <DialogContent className={`bg-white/70 border-0 min-w-3xl outline-0 shadow rounded-2xl`}>
            <DialogHeader className="text-center font-semibold">
                <DialogTitle>Add task</DialogTitle>
                <DialogDescription>Add task to your calendar</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
                {/* Task title */}
                <Field className="gap-2">
                    <FieldLabel htmlFor="task-title">Title</FieldLabel>
                    <Input name="title" value={formControls.title} onChange={handleChange} id="task-title" className="border shadow bg-white/45 border-gray-300 pl-2 rounded-xl" placeholder="Enter your title" />
                    <FieldDescription>
                        {formErrors.title && <div className="text-xs text-red-500">{formErrors.title}</div>}
                    </FieldDescription>
                </Field>

                {/* Task description */}
                <Field className="gap-2">
                    <FieldLabel htmlFor="task-description">Description</FieldLabel>
                    <textarea name="description" value={formControls.description} onChange={handleChange} id="task-description" className="border outline-0 min-h-24 bg-white/45 shadow border-gray-300 p-2 rounded-xl" placeholder="Enter your Description"></textarea>
                </Field>

                <div className="flex items-center gap-4">
                    {/* Task status */}
                    <Field>
                            <FieldLabel htmlFor="task-status">Status</FieldLabel>
                            <Select value={formControls.status} onValueChange={value => setFormControl(prev => ({...prev, status: value as CreateTaskInput["status"]}))}>
                                <SelectTrigger className="w-full bg-white/45 pl-2 rounded-xl shadow">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent className={`bg-gray-200 rounded-xl border border-slate-200 shadow-lg`}>
                                    <SelectItem className={`hover:bg-white/45`} value="todo">To Do</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="in-progress">In Progress</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                {formErrors.status && <div className="text-xs text-red-500">{formErrors.status}</div>}
                            </FieldDescription>
                    </Field>

                    {/* Task priority */}
                    <Field>
                            <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                            <Select value={formControls.priority} onValueChange={value => setFormControl(prev => ({...prev, priority: value as CreateTaskInput["priority"]}))}>
                                <SelectTrigger className="w-full bg-white/45 pl-2 rounded-xl shadow">
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>

                                <SelectContent className={`bg-gray-200 rounded-xl border border-slate-200 shadow-lg`}>
                                    <SelectItem className={`hover:bg-white/45`} value="low">Low</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="medium">Medium</SelectItem>
                                    <SelectItem className={`hover:bg-white/45`}  value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                {formErrors.priority && <div className="text-xs text-red-500">{formErrors.priority}</div>}
                            </FieldDescription>
                    </Field>
                </div>

               <div className="flex items-center justify-end gap-3">
                 <Button onClick={() => setOpen(false)} size={`sm`} variant={`outline`} className={`border cursor-pointer border-gray-400 rounded-xl`}>Cancel</Button>
                 <Button type="submit" size={`sm`} variant={`default`} className={`border cursor-pointer border-gray-400 font-bold bg-green-500 rounded-xl`} onClick={handleSubmit}>Add Task</Button>
               </div>

            </div>
        </DialogContent>

    </Dialog>
}