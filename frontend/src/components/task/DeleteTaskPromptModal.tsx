import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import { toast } from "sonner";

type DeleteTaskPromptModalTypeProps = {
    title: string
    id: string
}

export default function DeleteTaskPromptModal({title, id}: DeleteTaskPromptModalTypeProps) {
    const {deleteTask} = useTaskStore()
    const [open,setOpen] = useState<boolean>()

    const handleDelete = () => {
        deleteTask(id)
        setOpen(false)
        toast("Task Deleted Succesfully.")
    }


    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button type="submit" size={`sm`} variant={`destructive`} className={`border cursor-pointer border-gray-400 font-bold bg-red-500 rounded-xl`}><Trash /> Delete</Button>
        </DialogTrigger>

        <DialogContent className={`bg-white rounded-xl text-center border-0`}>
            <DialogHeader className="mt-5 gap-2">
                <div className="text-xl">Are you sure you want to Delete <span className="font-bold">{title}</span> Task?</div>
                <DialogDescription className={`text-sm text-shadow-gray-600`}>Once its deleted you cannot undo the changes.</DialogDescription>
            </DialogHeader>

            <div className="flex justify-end items-center gap-4">
                <Button type="submit" onClick={() => setOpen(false)} size={`sm`} variant={`outline`} className={`border cursor-pointer border-gray-400 font-bold rounded-xl`}>
                     Cancel
                    </Button>
                <Button type="submit" onClick={handleDelete} size={`sm`} variant={`destructive`} className={`border cursor-pointer border-gray-400 font-bold bg-red-500 rounded-xl`}><Trash /> Delete</Button>
            </div>
        </DialogContent>
        
    </Dialog>
}