import BoardToolbar from "@/components/base/BoardToolBar";
import KanbanBoard from "@/components/base/KanbanBoard";
import NavBar from "@/components/base/NavBar";


export default function HomePage(){

    return <div className="relative min-h-screen overflow-hidden bg-white" >
        {/* Gradient blobs */}
    <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-300/70 blur-3xl" />

        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-300/70 blur-3xl" />

        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-lime-300/70 blur-3xl" />
    </div>
        <div>
            {/* Navbar */}
            <NavBar />

            {/* topbar */}
            <div className="m-3">
                <BoardToolbar/>
            </div>

            {/* the three column */}
            <div className="m-5">
                <KanbanBoard />
            </div>
        </div>
    </div>
}