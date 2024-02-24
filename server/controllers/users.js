const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * @route POST /api/user/login
 * @desc Login
 * @access Public
 */
const login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' })
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    })

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if(user && isPasswordCorrect) {
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({ id: user.id }, secret, {expiresIn: '1d'})
        })
    } else {
        return res.status(400).json({ message: 'Login or password is wrong' })
    }
}

/**
 * @route POST /api/user/register
 * @desc Register
 * @access Public
 */
const register = async (req, res, next) => {
    const {email, name, password} = req.body

    if(!email || !password || !name) {
        res.status(500).json({ message: 'Please fill required fields' })
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (registeredUser) {
        return res.status(400).json({ message: 'User with this email already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    const secret = process.env.JWT_SECRET;

    if(user && secret) {
        res.status(201).json({
            id: user.id,
            email: user.email,
            name,
            token: jwt.sign({ id: user.id }, secret, {expiresIn: '1d'})

        })
    } else {
        return res.status({ message: 'Failed to create user' })
    }

}
const current = async (req, res, next) => {
    res.send('current')
}

module.exports = {
    login,
    register,
    current
}