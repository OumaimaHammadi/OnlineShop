const ManageOrderModel =require('../models/orders.model')
const  ProductModel =require('../models/product.model')

const validationResult =require('express-validator').validationResult

exports.getAdd=(req,res,next)=>{
    res.render('add-Product',{
        AdminError:req.flash('AdminError')[0],
        validationErrors: req.flash('validationErrors'),
         isUser : true ,
         isAdmin :true,

         pageTitle:'Add Product'


    })
}

exports.postAdd=(req,res,next)=>{
    //console.log(validationResult(req).array())//
    if(validationResult(req).isEmpty()){
        ProductModel.editImage({
           name: req.body.name,
           price: req.body.price,
           category: req.body.category,
            description:req.body.description,
           image :req.file.originalname
        })
        .then(() => res.redirect('/')) 
        .catch(err =>{
            //res.redirect('/error')
            next(err)
            
            console.log(err)
    
        } )
        
    } else {
    req.flash('validationErrors',
    validationResult(req).array())
    res.redirect('/admin/add') 
    }     
}







exports.getOrders=(req,res,next)=>{

    let status = req.query.status

    let validCategory =['Pending','Sent','Received']
    
    let OrderPromise
    if (status && validCategory.includes((status))) OrderPromise = ManageOrderModel.getProductBycategory(status)
    
    else

    OrderPromise =  ManageOrderModel.getAllOrders()




    OrderPromise.then(orders =>{
        res.render('m-orders',{
            orders:orders,
            isUser : true ,
            isAdmin :true,
            pageTitle:'Manage Orders',



    })


})}



exports.postSave = (req, res, next) => {
     console.log(req.body)
  ManageOrderModel.editItem(
    req.body.OrderId,
    {
      status: req.body.status,
      total: req.body.total,
      timestamp: Date.now()
    }
  )
  .then(() => res.redirect('/admin/orders'))
  .catch(err => console.log(err))
}




   
   



