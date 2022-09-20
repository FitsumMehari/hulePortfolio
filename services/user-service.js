const User = require('../models/user')

const getUserById = async function (userId) {
    return User.findById(userId)
}

module.exports = {
    getUserById,
}