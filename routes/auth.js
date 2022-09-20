const authController = require("../controllers/auth")

const express = require('express');

const router = express.Router();

router.post('/login', authController.getUserByEmailAndPassword)
router.post('/register', authController.addUserByEmailAndPassword)

module.exports = router