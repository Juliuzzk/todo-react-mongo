import Task from "../models/task.model.js"

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user_id: req.user.id,
        }).populate("user_id")
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body

        const newTask = new Task({
            title,
            description,
            date,
            user_id: req.user.id,
        })

        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user_id")

    if (!task) return res.status(404).json({ message: "Task not found" })

    res.json(task)
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: "Task not found" })

        res.sendStatus(204) // 204 -> All is ok, but i dont return nothing
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        if (!task) return res.status(404).json({ message: "Task not found" })

        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}
