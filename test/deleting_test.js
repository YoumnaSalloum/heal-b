var assert = require("assert");
const User = require('../db/mongo.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//describe tests
describe("Deleting posts", function () {
    var user;
  beforeEach(function (done) {
    user = new User({
        userName : "hamada",
        phoneNumber:34567867890,
        email:'hamada@gmail.com',
        password : '1234',
        id:'hamada@gmail.com'
    });
    user.save().then(function () {
      done();
    });
  });
  //create tests
  it("Deletes one post from the database", function (done) {
    User.findOneAndRemove({userName : "hamada"}).then(function(){
        User.findOne({userName : "hamada"}).then(function(result){
            assert(result === null)
            done()
        })
    })
  });
});