import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm()
    const { createTask, getTask, updateTask } = useTasks()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                setValue("title", task.title)
                setValue("description", task.description)
                setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"))
            }
        }

        loadTask()
    }, [])

    const onSubmit = handleSubmit(data => {
        const dataValid = {
            ...data,
            date: data.date
                ? dayjs.utc(data.date).format()
                : dayjs.utc().format,
        }

        if (params.id) {
            updateTask(params.id, dataValid)
        } else {
            createTask(dataValid)
        }
        navigate("/tasks")
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m2-2"
                        autoFocus
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        placeholder="Description"
                        rows="3"
                        {...register("description")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    ></textarea>

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        {...register("date")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    <button className="mt-2 w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage
