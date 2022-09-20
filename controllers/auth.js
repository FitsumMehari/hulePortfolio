const userService = require("../services/auth-service")

const getUserByEmailAndPassword = async (req, res) => {
    try {
        // Get credientials from req.body
        const email = req.body.email
        const password = req.body.password

        return res.status(200).json(await userService.getUserByEmailAndPassword(email, password))
    } catch (error) {
        return res.status(400).send("something went wrong")
    }

}

const addUserByEmailAndPassword = async (req, res) => {
    try {
        // Get credientials from req.body
        const email = req.body.email
        const password = req.body.password

        return res.status(200).json(await userService.addUserByEmailAndPassword(email, password))
    } catch (error) {
        return res.status(400).send("something went wrong")
    }
}

module.exports = {
    getUserByEmailAndPassword,
    addUserByEmailAndPassword
}