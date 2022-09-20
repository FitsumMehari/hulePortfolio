const userService = require("../services/user-service")

const getUserById = async (req, res) => {
    try {
        const { userId } = res.params

        return res.status(200).json(await userService.getUserById(userId))
    } catch (error) {
        return res.status(400).send("something went wrong")
    }

}

module.exports = {
    getUserById
}