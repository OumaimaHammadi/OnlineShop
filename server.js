const express = require('express')
const path = require('path')
const app = express()
const homeRouter = require('./routers/home.route')
const authRouter = require('./routers/auth.route')
const ProductRouter = require('./routers/product.route')
const cartRouter = require('./routers/cart.route')
const adminRouter= require('./routers/admin.route')
const OrdersRouter=require('./routers/orders.router')




const session =require('express-session')
const StoreSession =require('connect-mongodb-session')(session)
const flash =require('connect-flash')


app.use(express.static(path.join(__dirname ,'assetes')))
app.use(express.static(path.join(__dirname ,'images')))



app.use(express.static(path.join(__dirname ,'stylesheets')))
app.use('/photos',express.static('photos'))


app.use(flash())


const STORE = new StoreSession({
     //uri :'mongodb://localhost:27017/online-shop',
   uri :'mongodb://127.0.0.1:27017/online-shop',
// uri:'mongodb+srv://hammadiioumaima:2346789@onlineshopcluster.mujhabj.mongodb.net/',

   
    collection :'sessions'

})

app.use(session({
    secret:'this is my secret to hash express session ....',
    saveUninitialized :false,
    resave: false,
    store:STORE 
}))



app.set('view engine','ejs')
app.set('views','views') //default
app.use((req, res, next) => {
   
     UserName=req.session.username
    next()
})

app.use('/', homeRouter)
app.use('/', authRouter )
app.use('/product',ProductRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminRouter)
app.use('/orders',OrdersRouter)



// app.get('/error',(req,res,next)=>{
//     res.status(500)
//     res.render('error',{

//         isUser :req.session.userId ,
//         isAdmin :req.session.isAdmin,
//         pageTitle:'Error 500'


//     })
// })

// app.use((error,req,res,next)=>{
//     res.redirect('/error')
// })





app.get('/not-admin',(req,res,next)=>{
    res.status(403)

    res.render('not-admin',{

        isUser :req.session.userId ,
        isAdmin :false,
        pageTitle:'not-admin'


    })
})


app.listen(8100,(err)=>{

    console.log('Server is 8100 okk')

})
