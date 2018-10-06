const express = require("express");
const Router = express.Router()

const userController = require("./user_controller")

Router.post('/logout', userController.postLogout)
Router.post('/login', userController.postLogin)
Router.post('/signup', userController.postSignup)
Router.get('/getall', userController.getUserAll)
Router.delete('/delete/:id', userController.deleteUser)

module.exports = Router