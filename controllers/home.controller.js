
const productsModel = require('../models/product.model') 


exports.getHome = (req,res,next) => {
let category = req.query.category

 let validCategory =["Clothes", 'Cars', 'Flowers', 'Cellphone', 'Bicycle','Laptops']

//let validCategory =["vetement",'voiture','fleures','portable','velo','oumaima']


let productsPromise
if (category && validCategory.includes((category))) productsPromise = productsModel.getProductBycategory(category)

else

productsPromise = productsModel.getAllProducts()

productsPromise.then( products =>{
    res.render('index',{
     products : products ,
     isUser :  req.session.userId,
     isAdmin :req.session.isAdmin,
     pageTitle:'Home'
   

    }) 
})  



  

    

    


 
}
