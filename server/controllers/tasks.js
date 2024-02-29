const { prisma } = require('../prisma/prisma-client')

/**
 * @route GET /api/tasks
 * @desc get tasks
 * @access Private
 */
const getTasks = async (req, res) => {
    try {
        const { todoId } = req.body

        const tasks = await prisma.taskList.findMany({
            where: {
                todoId
            }
        })

        return res.status(200).json(tasks)
    } catch {
        res.status(500).json({ message: 'Failed to get tasks' })
    }
}

/**
 * @route POST /api/tasks/add
 * @desc add tasks
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params

        if (!data.isDone) {
            data.isDone = 'false'
        }

        if (!data.title) {
            return res.status(400).json({ message: 'Fill all fields' })
        }

        const task = await prisma.taskList.create({
            data: {
                ...data,
                todoId: id
            }
        })

        return res.status(200).json(task)
    } catch {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

/**
 * @route PUT /api/tasks/edit:id
 * @desc edit task
 * @access Private
 */
const edit = async (req, res) => {
    try {
        const data = req.body
        const id = data.id

        await prisma.taskList.update({
            where: {
                id
            },
            data
        })

        return res.status(200).json({ message: 'task was edited' })
    } catch {
        res.status(500).json({ message: 'Failed to edit task' })
    }
}

/**
 * @route POST /api/tasks/remove:id
 * @desc remove task
 * @access Private
 */
const remove = async (req, res) => {
    try{
        const { id } = req.body
    
        await prisma.taskList.delete({
            where: {
                id
            }
        })
        return res.status(200).json({ message: 'task was deleted' })
    } catch {
        res.status(500).json({ message: 'Failed to remove task' })
    }
}

module.exports = {
    getTasks,
    add,
    edit,
    remove
}