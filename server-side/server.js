const express = require('express')
const mongoose = require('mongoose')
var port = process.env.PORT || 8000
var session = require('express-session');
var multer = require('multer')
var path = require('path')
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
const User = require('../db/mongo');
// let port = 8000
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config(); // to read .env file
const users = require("./routes/Users.js")
app.use(users);
app.get("/select", function (req, res) {
  var bill2 = { amount: 900, hospitalName: "lol0" };
  User.find({}).then(function (result) {
    console.log(result[0].hospitalBill.push(bill2));
    console.log(result[0].hospitalBill);
    console.log(result);
    res.send(result[0].hospitalBill);
  });
});
app.get("/mayis",(req,res)=>{
  User.find({}).then(function (result) {
    console.log(result);
     res.json(result);})
})
app.get("/allUsers",(req,res)=>{
  User.findOne({id:req.body.id}).then(function (result) {
    console.log(result);
     res.json(result);})
})
// the user can see all his posts
app.get('/mypost',(req,res)=>{
  HospitalPost.find({postedBy:req.user._id})
  .populate('postedBy',"_id userName")
  .then(mypost=>{
      res.json({mypost})
  })
  .catch(err=>{
      console.log(err)
  })
})
//youmna
app.listen(port, () => {
  console.log("listening to port 8000");
});