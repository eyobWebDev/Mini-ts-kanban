import { Calendar, ListSortDescendingIcon, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddTaskModal from "../task/AddTaskModal";



export default function NavBar(){

    return <div className="flex justify-between p-3 w-full bg-white/80 drop-shadow-xl">
        <div className="flex justify-center items-center gap-2">
            <div className="p-1.5 rounded bg-black">
                <Menu className="text-white" />
            </div>
            <div>
                <h1 className="font-bold text-xl">Todo Board</h1>
                <h4 className="text-mauve-500 text-xs">Plan task and track progress</h4>
            </div>

        </div>

        <div className="flex items-center gap-2">
            <Button size={"sm"} className="shadow flex gap-2 items-center pl-2 border-2 rounded-xl border-gray-300">
                <Search size={17} className="text-gray-400" />
                <Input type="text" size={15}  placeholder="Search task" className="p-1" />
            </Button>
            
            <AddTaskModal />
            <Button size={`sm`} className={`rounded-xl border border-gray-300 shadow font-bold`}><ListSortDescendingIcon /> Sort</Button>
            <Button size={`sm`} className={`rounded-xl border border-gray-300 shadow font-bold`}><Calendar /> Today</Button>

        </div>
    </div>
}