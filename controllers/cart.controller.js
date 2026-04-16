const cartModel =require('../models/cart.model')
const validationResult = require('express-validator').validationResult


exports.getCart = (req,res,next) =>{
    cartModel.getItemsByUser(req.session.userId).then((items) => {
   res.render('cart', { items:items,
    validationError: req.flash('validationErrors')[0],
         isUser : true,
         isAdmin :req.session.isAdmin,
         pageTitle:'Cart'


        })
        // console.log(items)

 
    }).catch(err => {
        //next(err)

        console.log(err)

    }
       
    )
}


exports.postCart=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem ({
                name:req.body.name ,
                amount:req.body.amount ,
                price :req.body.price,
                productId : req.body.productId,
                userId: req.session.userId,
                timestamp: Date.now()
        }).then(()=>{
            res.redirect ('/cart')
        }).catch(err => {
            //next(err)

            console.log(err)
            })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo )
    }

}

exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.editItem
        (req.body.cardId,{
        amount:req.body.amount, 
        timestamp: Date.now()
        }).then(()=> res.redirect('/cart'))
        .catch(err =>{
            //next(err)
            console.log(err)

        } )
    } else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}
exports.postDelete=(req,res,next)=>{
    cartModel
    .deleteItem(req.body.cardId)
    .then(()=>res.redirect('/cart'))
    .catch(err =>{
        //next(err)

        console.log(err)
    }
        )

}


exports.postDeleteAll=(req,res,next)=>{
    cartModel
    .deleteAllItem(req.body.cardId)
    .then(()=>res.redirect('/cart'))
    .catch(err =>
        {               //next(err)

            console.log(err)})

}







//publication des données de cart dans order


 

    exports.postOrders=(req,res,next)=>{
        if(validationResult(req).isEmpty()){
            cartModel.addNewOrders({
                name:req.body.name ,
                price :req.body.price,

                amount:req.body.amount ,
                addresse:req.body.addresse,
                status :req.body.status,
                total: req.body.total,
                 userId:req.session.userId,//id de l'user
               
                cardId : req.body.cardId,
                orderId: req.session.orderId, //id de cart
                timestamp: Date.now()
            })
            .then(() => res.redirect('/orders')) 
                
            .catch(err =>{
                console.log(err)
        
        res.redirect('/cart') 
            } )
            
        } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart') 
        }
          
        
    

    }








