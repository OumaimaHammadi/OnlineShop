const ProductModel = require('../models/product.model')



exports.getProduct =(req,res,next)=>{
    ProductModel.getFirstProduct().then(product=>{
        res.render('product',{
            product : product ,
            isUser:true,
            validationError: req.flash('validationErrors')[0],
            isAdmin :req.session.isAdmin,
           pageTitle:'Product'


            
           

        })

    })
}


exports.getProductByid =(req,res,next) => {
    //get id 
    //get product
    // render index.ejs
    let id =req.params.id
    ProductModel.getProductById(id).then((product) =>{
    res.render('product',{
        product : product ,
        isUser : req.session.userId,
        validationError: req.flash('validationErrors')[0],
        isAdmin :req.session.isAdmin,
        pageTitle:'Product'



    })

    
    }) 
}
//




