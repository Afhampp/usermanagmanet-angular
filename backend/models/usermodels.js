const mongoose =require('mongoose')
const userSchema=mongoose.Schema({
  
    name: {type:String, 
        required: true,
    },

    email:  {
        type:String, 
        required: true,
     
    },
    password:  {
        type:String, 
        required: true
    },
    phone:  {
        type:Number, 
        required: true
    },
    image: {
        tyep:String
    }
})

module.exports=mongoose.model('userdb',userSchema)