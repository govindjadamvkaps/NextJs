import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type:String,
    required:true
  },
  age: {
    type: Number,
    required: true,
  },
  gender:{
    type:String
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String,
  },
  
  tokens:[{
    token:{type:String, required:true}
}]
  
},
{
  timestamps:true
});


userSchema.methods.generateAuthToken = async function(){
  try {
      // console.log("token code")
      const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY,{expiresIn:"2h"})    
      this.tokens = this.tokens.concat({token:token})

      await this.save()
      return token;
  } catch (error) {
      console.log("error in genreting token", error)
  }
  
}

const UserModel =mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
