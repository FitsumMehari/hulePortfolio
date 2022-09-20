const userController = require("../controllers/user")

const express = require('express');

const router = express.Router();

router.get('/:userId', userController.getUserById)

module.exports = router