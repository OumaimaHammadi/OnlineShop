const orderModel =require('../models/orders.model')
const validationResult = require('express-validator').validationResult
const cartModel =require('../models/cart.model')
const UserModel= require('../models/auth.model')





exports.getOrders=(req,res,next) =>{
// 
orderModel.getOrdersByUser(req.session.userId).then((orders) => {
   res.render('Orders',{
        orders: orders,

         validationError: req.flash('validationErrors')[0],
         isUser :true ,
         isAdmin :req.session.isAdmin,
         pageTitle:'Orders'



        })
// console.log(orders[1].userId.email)

  }).catch(err => {console.log(err)})
}



 exports.postOrdersssssssssssssssssssss=(req,res,next)=>{

    
    if(validationResult(req).isEmpty()){
        orderModel.addNewOrders ({
            name:req.body.name ,

            price :req.body.price,
    
    
            amount:req.body.amount ,
    
            addresse:req.body.addresse,
            status :req.body.status,
            total: req.body.total,
            // username:'oumaima',
            // email:'h@gmail.com',

            username: req.body.username,
            email: req.body.email,



     userId:req.session.userId,


            timestamp: Date.now()
             
                
                

        }).then(()=>{ res.redirect('/orders')


        }).catch(err => {

            console.log(err)
            })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo )
    }

}
 

exports.postOrders= async (req, res, next) => {
  try {
    if (!validationResult(req).isEmpty()) {
      req.flash('validationErrors', validationResult(req).array())
      return res.redirect(req.body.redirectTo)
    }

    // 🔹 récupérer l'utilisateur depuis la BD
    const user = await UserModel.findUserById(req.session.userId)

    if (!user) {
      return res.status(401).send('User not found')
    }

    await orderModel.addNewOrders({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount,
      addresse: req.body.addresse,
      status: 'Pending' || req.body.status,
      total: req.body.total,

      // ✅ données récupérées depuis MongoDB
      username: user.username,
      email: user.email,
      userId: user._id,

      timestamp: Date.now()
    })

    console.log("username:", user.username, "email:", user.email, user._id)
    res.redirect('/orders')

  } catch (err) {
    console.log(err)
  }
} 









exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        orderModel.editItem
        (req.body.OrderId,{
        amount:req.body.amount ,
        addresse:req.body.addresse,
        status :'Pending',
        total: req.body.total,
        username :req.body.username,
        email :req.body.email,
        timestamp: Date.now()
        }).then(()=> res.redirect('/orders'))
        .catch(err => console.log(err))
    } else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/orders')
    }
}

exports.postDelete=(req,res,next)=>{
    orderModel
    .deleteItem(req.body.OrderId)
    .then(()=>res.redirect('/orders'))
    .catch(err =>console.log(err))

}


exports.postDeleteAll=(req,res,next)=>{
    orderModel
    .deleteAllItem(req.body.OrderId)
    .then(()=>res.redirect('/cart'))
    .catch(err =>console.log(err))

}

