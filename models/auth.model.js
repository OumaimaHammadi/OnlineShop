const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
//const DB_url ='mongodb://localhost:27017/online-shop'
//const DB_URL='mongodb://127.0.0.1:27017/online-shop'
const DB_URL='mongodb+srv://hammadiioumaima:2346789@onlineshopcluster.mujhabj.mongodb.net/'



const userSchema =mongoose.Schema({
    username: String,
    email:String,
    password: String ,
    isAdmin:{           //login
        type:Boolean,
        default:false
    }

})
const User = mongoose.model('user',userSchema)






exports.createNewUser = (username,email,password) =>{
    return new Promise((resolve ,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if(user){
            mongoose.disconnect()
            
             reject ('email is used')
        } else {
return bcrypt.hash(password,10)
        }

    }).then(hashedpassword =>{
        let user =new User ({
            username: username,
            email: email,
            password: hashedpassword
        })
        return user.save()
    }).then(()=>{
        mongoose.disconnect()
        resolve()
    }).catch(err => 
        {mongoose.disconnect() 
            reject(err)    
         }) 

    })
 
}


exports.login =(email,password)=>{
    //check email
    //no ===> err
    // yes ===> check password
    // no ===> err
    //yes ===> set session

    return new Promise((resolve ,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
            return User.findOne({email:email})
        }).then(user => {
            if(!user){
            mongoose.disconnect()
             reject ('there is no user matches this email')
        } else {
bcrypt.compare(password,user.password).then(same =>{ 
    if(!same){
        mongoose.disconnect()
        reject('password is incorrect')
    }
    else {
        mongoose.disconnect()
        resolve({
            id:user._id ,
            isAdmin:user.isAdmin
        })

    }
    })
        }
    }).catch(err =>{
        mongoose.disconnect()
        reject(err)

    })

    })
}


exports.findUserById = (id) => {
  return mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    return User.findById(id)
  })
}



