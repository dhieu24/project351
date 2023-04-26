const UserModel = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username)
        console.log(password)
        const existedUser = await UserModel.findOne({username}) // mongoose

        if(existedUser){
            throw new Error('Username duplicate')
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            username,
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
        const {username, password} = req.body;
        console.log(username)
        console.log(password)

        const existedUser = await UserModel.findOne({
            username
        })

        console.log(existedUser)

        if(!existedUser){
            throw new Error('Password hoặc username không đúng')
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