const UserModel = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const {name, username, email, password} = req.body;
        console.log(name)
        console.log(username)
        console.log(email)
        console.log(password)
        const existedUserEmail = await UserModel.findOne({email}) // mongoose

        if(existedUserEmail){
            throw new Error('Email duplicate')
        }

        const existedUsername = await UserModel.findOne({username}) // mongoose

        if(existedUsername){
            throw new Error('Username duplicate')
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            name,
            username,
            email,
            password: hashPassword
        });

        console.log(newUser)

        const cloneNewUser = JSON.parse(JSON.stringify(newUser))
        
        res.send({
            success: 1,
            data: {
                ...cloneNewUser,
                password: ''
            }
        })
    } catch (error) {
        res.status(400).send({success: 0, message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email)
        console.log(password)

        const existedUser = await UserModel.findOne({
            email
        })

        console.log(existedUser)

        if(!existedUser){
            throw new Error('Password hoặc email không đúng')
        }

        const matchedPassword = await bcrypt.compare(password, existedUser.password)

        if(!matchedPassword){
            throw new Error('Password or username is incorrect')
        }

        const {userId} = existedUser._id

        const token = jwt.sign({
            userId
        }, 'csds351', {
            expiresIn: 60 * 60 * 24 * 7
        })

        res.send({
            success: 1,
            message: "Login successfully",
            username: existedUser.username,
            name: existedUser.name,
            email: existedUser.email,
            data: {_id: userId, token}
        })
    } catch (error) {
        res.status(400).send({success: 0, message: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const username = req.params.username;
        const existedUser = await UserModel.findOne({
            username
        })

        console.log(existedUser)

        if(!existedUser){
            throw new Error('User does not exist')
        }

        const matchedPassword = await bcrypt.compare(password, existedUser.password)

        if(!matchedPassword){
            throw new Error('Password or username is incorrect')
        }

        const {userId} = existedUser._id

        const token = jwt.sign({
            userId
        }, 'csds351', {
            expiresIn: 60 * 60 * 24 * 7
        })

        res.send({
            success: 1,
            message: "Login successfully",
            data: {_id: userId, token}
        })
    } catch (error) {
        res.status(400).send({success: 0, message: error.message})
    }
}

module.exports = {
    register,
    login,
}