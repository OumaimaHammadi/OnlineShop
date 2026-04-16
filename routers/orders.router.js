const router =require('express').Router()
const bodyParser =require('body-parser')
const check =require('express-validator').check


const orderController =require('../controllers/orders.controller')
const bodyParserMW = bodyParser.urlencoded ({extended :true})

const authguard = require('./guards/auth.guard')
router.post('/',authguard.isAuth,bodyParserMW, orderController.postOrders)
router.get('/',authguard.isAuth, orderController.getOrders)
router.post('/',authguard.isAuth,bodyParserMW,orderController.postOrders)

router.post('/save',authguard.isAuth,bodyParserMW,
check('amount')
.not()
.isEmpty()
.withMessage(" Nombre d'Articles  est requise")
.isInt({min:1})
.withMessage('le montant est supérieur à 0'),
check('addresse')
.not()
.isEmpty()
.withMessage("l'adresse est requise"),

// check('status')
// .not()
// .isEmpty()
// .withMessage('status is required'),

// check('total')
// .not()
// .isEmpty()
// .withMessage('total is required'),



orderController.postSave)
router.post('/cancel',authguard.isAuth,bodyParserMW,orderController.postDelete)




module.exports=router