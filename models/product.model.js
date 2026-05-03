const mongoose = require('mongoose')
//const DB_URL = 'mongodb://localhost:27017/online-shop'
const DB_URL='mongodb://127.0.0.1:27017/online-shop'

// const DB_URL='mongodb+srv://hammadiioumaima:2346789@onlineshopcluster.mujhabj.mongodb.net/'


const productSchemas =mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
   


})
const Product = mongoose.model('product',productSchemas)
///get All Product
exports.getAllProducts = () => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=>{
            return Product.find({}).then((products)=>{
                mongoose.disconnect()
                resolve(products)})
                .catch(err => reject(err))        

    })
   
    })
    //get products orders
    //disconnect db
}


///Filtrage des products
exports.getProductBycategory = (category) => {
    //connect db
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Product.find({category:category}).then((products)=>{
                mongoose.disconnect()
                resolve(products)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}


/// Voir Product by id
exports.getProductById = (id) => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Product.findById(id).then((products)=>{
                mongoose.disconnect()
                resolve(products)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}


exports.getFirstProduct = () => {
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Product.findOne({}).then((product)=>{ ///product au lieu de products
                mongoose.disconnect()
                resolve(product)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}
//le meme nom 


//upload image par l'Admine
exports.editImage=(data)=>{
    return new Promise((resolve,reject) =>{

        mongoose.connect(DB_URL,
            { useNewUrlParser: true , useUnifiedTopology: true})
            .then(()=>{
        let item = new Product(data)//
        return item.save()
    
    }).then(()=>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}


