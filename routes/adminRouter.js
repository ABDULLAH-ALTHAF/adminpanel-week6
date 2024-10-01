const express = require('express')
const { adminhome, adminlogout, userDelete, postcreateUser, createUser, userEdit, postuserEdit } = require('../controllers/adminController')
const { login } = require('../controllers/userController')
const { search } = require('../controllers/adminController')
const app = express()
const router = express.Router()

router.get('/',adminhome)
router.get('/login',login)
router.get('/logout',adminlogout)
router.get('/userDelete/:userId',userDelete)
router.get('/createuser',createUser)
router.post('/createuser',postcreateUser)
router.get('/useredit/:userId',userEdit)
router.post('/useredit/:userId',postuserEdit)
router.get('/search',search)



module.exports = router


