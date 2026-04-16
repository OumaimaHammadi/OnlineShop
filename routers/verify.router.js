const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const verifyController =require('../controllers/verify.controller')
const authguard = require('./guards/auth.guard')
//const check =require('express-validator').check

//router.get('/',authguard.isAuth,verifyController.getVerify)
 

//router.post('/',authguard.isAuth,bodyParsercart,verifyController.postVerify)





//module.exports = router



//module.exports=router