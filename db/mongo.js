const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config(); // to read .env file
const mongoURI = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://youmna:123@mongodbc01-hu68n.mongodb.net/mongodbc01?retryWrites=true&w=majority", { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("connection has been made");
  });

db.on("error", (error) => {
    console.log("Connection error:", error);
  });


const hospitalBillSchema=new Schema({
    amount:{
        type:Number,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    },
    hospitalPhoneNumber:{
        type:Number,
        required:true
    },
    hospitalAddress:{
         type:String,
         required:true
    },
    descAboutHealthPatient:{
        type:String,
        required:true
    },
    patientPhoneNumber:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"users"
    }
 })

//food category schema 
const FoodCategoriesSchema = new Schema({
    descriptionOfPrescription:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
     UserPhoneNumber:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    }
    ,
    postedBy:{
        type:ObjectId,
        ref:"users"
    }
 })


 //user schema 


const User=new Schema({
    userName :{
        type: String,
        required: true,
    },
    phoneNumber:{ 
      type: Number,
    required: true
    },
    email :{
    type:String,
    required: true,
    unique: true
    },
    password :{
    type:String,
    required: true,
    },
    id:{
        type:String,
        required: true,
        unique: true
        
    },

     hospitalBill:[hospitalBillSchema],
     FoodCategories:[FoodCategoriesSchema]

})

//creating models for the schemas
const userModel=mongoose.model('user',User,"users")

module.exports = userModel;

