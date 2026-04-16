const router = require('express').Router() //router level
const authguards = require('./guards/auth.guard')
const homeController = require('../controllers/home.controller')


router.get('/',homeController.getHome) //middleware je la fais dans controller(home.controller.js)




module.exports = router
