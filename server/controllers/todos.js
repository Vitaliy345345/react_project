const { prisma } = require('../prisma/prisma-client')

/**
 * @route GET /api/todos
 * @desc get todos
 * @access Private
 */
const getTodos = async (req, res) => {
    try {
        const { userId } = req.body

        const todos = await prisma.todoList.findMany({
            where: {
                userId
            }
        })
        return res.status(200).json(todos)
    } catch {
        res.status(400).json({ message: 'Failed to get todos' })
    }
}

/**
 * @route POST /api/todos/add
 * @desc add todo
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;


        if (!data.filter || !data.createTime) {
            data.filter = 'all'
            data.createTime = new Date().toLocaleString()
        }

        if (!data.title || !data.color || !data.time) {
            return res.status(400).json({ message: 'Fill all fields' })
        }

        const todo = await prisma.todoList.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(201).json(todo)
    } catch {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

/**
 * @route POST /api/todos/remove/:id
 * @desc remove todo
 * @access Private
 */
const remove = async (req, res) => {
    try {
        const { id } = req.body

        await prisma.todoList.delete({
            where: {
                id
            }
        })

        return res.status(204).json({ message: 'todo was deleted' })
    } catch {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

/**
 * @route PUT /api/todos/edit/:id
 * @desc edit todo
 * @access Private
 */
const edit = async (req, res) => {
    try {
        const data = req.body
        const id = data.id

        await prisma.todoList.update({
            where: {
                id
            },
            data
        })

        return res.status(204).json({ message: 'todo was edited' })
    } catch {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = {
    getTodos,
    add,
    remove,
    edit
}