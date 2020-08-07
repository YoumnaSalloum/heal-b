const assert = require('assert');
const User = require('../db/mongo');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//describe tests
describe("Finding posts", function () {
    var user;
  beforeEach(function (done) {
     user = new User({
        userName : "lubna",
        phoneNumber:34567867890,
        email:'lubna@gmail.com',
        password : '1234',
        id:'lubna@gmail.com',
        hospitalBill:[],
        FoodCategories:[]
    });
    user.save().then(function () {
      done(); 
    });
  });
  //create tests
  it("Finds one post from the database", function (done) {
    User.findOne({ userName : "lubna" }).then(function (result) {
      assert(result.userName === "lubna");
      done()
    });
  });

  it("Finds one post by ID from the database", function (done) {
    User.findOne({_id:user._id}).then(function (result) {
      assert(result._id.toString() === user._id.toString());
      done()
    });
  });
});
