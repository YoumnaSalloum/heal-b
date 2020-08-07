const assert = require('assert');
const User = require('../db/mongo');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//describe tests
describe("Updating bills posts", function () {
    var user;
  beforeEach(function (done) {
     user = new User({
        userName : "sami",
        phoneNumber:34567867690,
        email:'sami@gmail.com',
        password : '1234',
        id:'sami@gmail.com',
        hospitalBill:[],
        FoodCategories:[]
    });
    user.save().then(function ()  {
      done();
    });
  });
  //create tests
  //var num =897987
  it("Updates one post in the database (pushing FoodCategories)", function (done) {
    User.findOneAndUpdate({userName : "sami"},  { $push: {FoodCategories:{ descriptionOfPrescription:'The drug is only sold with a prescription.',Category:'Diabetes',
        UserPhoneNumber:897987,photo:'imgurl',postedBy:user._id
   } } }).then(function(){
        User.findOne({_id:user._id}).then(function(result){
             assert(result.FoodCategories.length >0)
             done()
         })
     })
  });
  it("Updates one post in the database (pushing bills)", function (done) {
    User.findOneAndUpdate({userName : "sami"},   { $push: { hospitalBill:{amount:67,hospitalName:'king abdullah hospital',
        hospitalPhoneNumber:1234567890,hospitalAddress:'Irbid',
        descAboutHealthPatient:'Diabetes Patient',patientPhoneNumber:0867676765,photo:'imgurl',postedBy:user._id
    } } }).then(function(){
        User.findOne({_id:user._id}).then(function(result){
             assert(result.hospitalBill.length>0)
             done()
         })
     })
  });

});

