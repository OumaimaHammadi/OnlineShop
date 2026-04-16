const router =require('express').Router()
const bodyParser =require('body-parser')
const bodyParsercart= bodyParser.urlencoded({extended :true})
const cartController =require('../controllers/cart.controller')
const authguard = require('./guards/auth.guard')
const check =require('express-validator').check


router.get('/',authguard.isAuth, cartController.getCart)
 //get verify


router.post('/',authguard.isAuth,bodyParsercart,
check('amount')
.not()
.isEmpty()
.withMessage('amount is required')
.isInt({min:1})
.withMessage('amount is greater than 0'),
cartController.postCart
)

router.post('/save',authguard.isAuth,bodyParsercart,
check('amount')
.not()
.isEmpty()
.withMessage('amount is required')
.isInt({min:1})
.withMessage('Le montant doit être   supérieur à 0'),
cartController.postSave
)


router.post('/delete',authguard.isAuth,bodyParsercart,cartController.postDelete)
router.post('/deleteAll',authguard.isAuth,bodyParsercart,cartController.postDeleteAll)
router.get('/orders',authguard.isAuth)
//, cartController.postOrders








module.exports=router