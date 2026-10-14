import { create } from 'zustand'
import { v4 as uuidv4} from "uuid"


export type TaskStatus = "todo" | "in-progress" | "done"
type TaskPriority = "low" | "medium" | "high" 

export type Task = {
    readonly id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    dueDate: string
    createdAt: string
    updatedAt: string
}

export type CreateTaskInput = {
    title: string, description?: string, status: TaskStatus, priority: TaskPriority
}

export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "status" | "priority" | "dueDate">>

type TaskStore = {
    tasks: Task[],

    createTask: (input: CreateTaskInput) => void
    updateTask: (id: string, updateInput: UpdateTaskInput) => void
    deleteTask: (id: string) => void
    moveTask: (id: string, status: TaskStatus) => void 
}


export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],

    createTask: (input) => {
        const now = new Date().toISOString()
        const newTask: Task = {
            id: uuidv4(), priority: input.priority, createdAt: now, updatedAt: now,
            title: input.title, description: input.description, status: input.status, dueDate: now
        }
        set(state => ({tasks: [...state.tasks, newTask]}))
    },

    updateTask: (id, updateInput) => {
        set(state => ({
            tasks: state.tasks.map(task => (
                task.id === id ?
                {
                    ...task, 
                    ...updateInput,
                    updatedAt: new Date().toISOString()
                } :
                task
            ))
        }))
    },

    deleteTask: (id) => {
        set(state => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }))  
    },

    moveTask: (id, status) => {
        set(state => ({
            tasks: state.tasks.map(task => (
                task.id === id ? 
                    {
                        ...task, 
                        status, 
                        updatedAt: new Date().toISOString()
                    } 
                    : task
            ))
        })) 
    },
}))