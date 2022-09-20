
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please enter a username'],
      unique: true,
    },

    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true,'please provide a valid password'],
      minLenght:6
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//hashing the password
userSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

     // adding jwt
userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET,{expiresIn:process.env.LIFE_TIME})
}
userSchema.methods.comparePassword = function(cadidatepassword){
  return bcrypt.compare(cadidatepassword,this.password)
}
module.exports = mongoose.model("User", userSchema);
