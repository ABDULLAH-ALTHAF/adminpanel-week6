const express = require('express')
const { login, signup, home, logout, postsignup, postlogin } = require('../controllers/userController')
const app = express()
const router = express.Router()


router.get('/login',login)
router.get('/signup',signup)
router.post('/signup',postsignup)
router.get('/home',home)
router.get('/logout',logout)
router.post('/login',postlogin)




module.exports = router