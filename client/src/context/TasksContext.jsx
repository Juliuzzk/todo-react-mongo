/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import {
    createTasksRequest,
    deleteTaskRequest,
    getTaskRequest,
    getTasksRequest,
    updateTasksRequest,
} from "../api/tasks"
import { flushSync } from "react-dom"

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider")
    }

    return context
}

export function TaskProvider({ children }) {
    const [tasks, setTask] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTask(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async task => {
        console.log("task!")

        const res = await createTasksRequest(task)
        console.log(res)
    }

    const deleteTask = async id => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) task.filter(tasks => task._id != id)
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async id => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTasksRequest(id, task)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
                deleteTask,
                getTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
