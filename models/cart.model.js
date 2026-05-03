const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/online-shop'

// const DB_URL='mongodb+srv://hammadiioumaima:2346789@onlineshopcluster.mujhabj.mongodb.net/'


const cartSchema= mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
    //userId:String,
    productId:String,
    timestamp:String
})
const cartItem =mongoose.model('cart',cartSchema)

exports.addNewItem= (data)=>{
    return new Promise((resolve,reject)=>{
mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    let item = new  cartItem(data)
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



exports.getItemsByUser= (userId) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return cartItem
          .find(
           {userId: userId},
           {},
                    {sort : {timestamp: 1 }}

          // productId: productId
         
          )
          .populate('userId')
      })
      .then(items => {
        mongoose.disconnect()
        resolve(items)
      })
      .catch(err => {
        mongoose.disconnect()
        reject(err)
      })
  })
}





// exports.getItemsByUser= (userId) =>{
//     return new Promise((resolve,reject) =>{
//         mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
//        cartItem.find(
//             {userId : userId},
//             {},
//             {sort : {timestamp: 1 }}
          
//             ).populate('userId')
    
//     ).then(items =>{
//             mongoose.disconnect()
//             resolve(items)
//     }).catch(err =>{
//                 mongoose.disconnect()
//                 reject(err)
//         })
//     })
// }

// exports.getItemsByUser = (userId) => {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(DB_URL, { 
//       useNewUrlParser: true, 
//       useUnifiedTopology: true 
//     })
//     .then(() => {
//       return cartItem.aggregate([
//         { $match: { userId:new mongoose.Types.ObjectId(userId) } },

//         {
//           $group: {
//             _id: "$productId",
//             name: { $first: "$name" },
//             price: { $first: "$price" },
//             amount: { $sum: "$amount" },
//             userId: { $first: "$userId" }
//           }
//         },

//         { $sort: { _id: 1 } }
//       ])
//     })
//     .then(items => {
//       mongoose.disconnect()
//       resolve(items)
//     })
//     .catch(err => {
//       mongoose.disconnect()
//       reject(err)
//     })
//   })
// }





//modifier&&save
exports.editItem=(id,newData)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>
       cartItem.updateOne({_id:id},newData)
    
    ).then(items =>{
            mongoose.disconnect()
            resolve(items)
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
       cartItem.findByIdAndDelete({_id:id})
    
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
       cartItem.deleteMany()
    
    ).then(() =>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}



