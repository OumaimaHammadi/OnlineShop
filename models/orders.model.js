const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/online-shop'

// const DB_URL='mongodb+srv://hammadiioumaima:2346789@onlineshopcluster.mujhabj.mongodb.net/'


const orderSchema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    addresse:String,
    total:Number,
    status:String,
    cardId:String,
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    username: String,
    email: String,
    timestamp:String
})
const orderItem = mongoose.model('ordercart',orderSchema)

exports.addNewOrders= (data)=>{
    return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
        let order = new  orderItem(data)
        return order.save()
    }).then(()=>{
        mongoose.disconnect()
        resolve()
    }).catch(err =>{
        mongoose.disconnect()
        reject(err)
    
    })
    
        })
    }



  
// exports.getOrdersByUser = (userId) => {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(DB_URL)
//       .then(() => {
//         return orderItem.aggregate([
//           {
//             $match: {
//               userId: new mongoose.Types.ObjectId(userId)
//             }
//           },
//           {
//             $group: {
//               _id: "$name",              // regroupement par produit
//               name: { $first: "$name" },
//               price: { $first: "$price" },
//               amount: { $sum: "$amount" },
//               userId: { $first: "$userId" }
//             }
//           },
//           {
//             $sort: { _id: 1 } // ou timestamp si tu le gardes
//           }
//         ])
//       })
//       .then(orders => {
//         mongoose.disconnect()
//         resolve(orders)
//       })
//       .catch(err => {
//         mongoose.disconnect()
//         reject(err)
//       })
//   })
// }



exports.getOrdersByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL).then(() =>
      orderItem.find(

            {userId : userId},
        {},

        { sort: { timestamp: 1 } }
      ).populate('userId')
    )
    .then(orders => {
      mongoose.disconnect()
      resolve(orders)
    })

    
    .catch(err => {
      mongoose.disconnect()
      reject(err)
    })
  })
}













//modifier&&save

exports.editItem=(id,newData)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       // orderItem.insertMany({_id:id} ,newData)
        orderItem.updateMany({_id:id} ,newData)

    
    ).then(orders=>{
            mongoose.disconnect()
            resolve(orders)
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}
//deleteOne
exports.deleteItem=(id)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
        orderItem.findByIdAndDelete({_id:id})
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}

//deleteAll
exports.deleteAllItem=(id)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
        orderItem.deleteMany()
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}



exports.getProductBycategory = (status) => {
    //connect db
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return orderItem.find({status:status}).then((orders)=>{
                mongoose.disconnect()
                resolve(orders)
            }).catch(err => reject(err))
               
            

    })
   
    })
    
}



exports.getAllOrders = () => {
  return new Promise((resolve,reject)=>{
          mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true})
          .then(()=>{
              return orderItem.find({}).then((orders)=>{
                  mongoose.disconnect()
                  resolve(orders)})
                  .catch(err => reject(err))        
  
      })
     
      })
}





 
  

