const express = require('express');
const { login, register } = require('../../controller/AuthController');
const authRoutes = express.Router();

router.post('/login',login)
router.post('/register',register)


module.exports = authRoutes;