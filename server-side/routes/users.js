const mongoose = require('mongoose')
const express =require ('express')
//youmna
var path = require('path')
const User = require('../../db/mongo');
var multer = require('multer')
var nodemailer = require('nodemailer');
var session = require('express-session');
var bodyParser = require('body-parser');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youmna61998@gmail.com',
      pass: 'youmna1998'
    }
  });
//connect the route with User.js schema
const users = express.Router();
const cors = require('cors');
require('dotenv').config(); // to read .env file
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
users.use(cors());
//route for profile 
    users.post("/mypost",(req,res)=>{
        User.findOne({id:req.body.email}).then(function (result) {
          console.log(result);
           res.json(result);})
      })
users.post('/signUp', (req, res) => {
    const userData = {
        userName : req.body.myData.userName,
        phoneNumber: req.body.myData.phoneNumber,
        email: req.body.myData.email,
        password: req.body.myData.password,
        id:req.body.myData.email
    }
    console.log(req.body.myData)
        User.findOne({
            email: req.body.myData.email
        })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.myData.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                    .then(user => {
                        res.json({status: user.email + 'added'})
                    })
                    .catch(err=> {
                        res.send('error: ' + err)
                    })
                })
            } else {
                 res.json({error: 'email already exist'})
            }
        })
        .catch(res => {
            res.send('error: ' + err)
        })
})
var obj={}
var obj2={email:''}
users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.myData.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.myData.password, user.password)) {
                req.session.loggedin = true;
                const payload = {
                    _id: user._id,
                    password: user.password,
                    email: user.email
                }
               
                obj.id = user._id
                obj2.email=user.email
                let token = jwt.sign(payload, process.env.JWT_KEY+"", {
                    expiresIn: 1440
                })
                res.send(token)
            } else {
                res.json({error: "User dose not exist"})
            }
        } else {
            res.json({error: "User dose not exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})
users.get('/logout', (request, response) => {
    console.log('Destroying session');
    request.session.destroy();
    response.send({ result: 'OK', message: 'Session destroyed' });
});
users.post('/send',(req,res)=>{
    var bill = {amount:900,hospitalName:'lol0'}
    var bill2 = {amount:0,hospitalName:'youmna'}
   var payment=req.body.payment
   var selected=req.body.selected
   var feed=req.body.feed
   var id=req.body.id
        User.findOne({id:id}).then(function(result){
        console.log("youmna "+result)
                var mailOptions = {
                    from: 'youmna61998@gmail.com',
                    to:obj2.email,
                    subject: 'Sending Email using Node.js',
                    text:'someone pay for you '+payment+' $'+' and the way of payment is '+selected+' and the feedback is : '+feed
                  };
                  //
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
               });
        res.send('youmna send: ')
        })
   })
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 11000000 },
  }).single("myImage");
  users.post("/upload", function (req, res) {
  var imgurl="";
    console.log(req.body);
    upload(req, res, function (err) {
      var hosBill = JSON.parse(req.body.Billdata);
      console.log(hosBill.amount)
      console.log(hosBill.id)
       imgurl+= req.file.destination+ req.file.filename
       console.log(imgurl)
      console.log("Request file ---", req.file.destination+ req.file.filename); //Here you get file.
    //push bill for hospitalbill array
    // amount:{ hospitalName:{ hospitalPhoneNumber:{ hospitalAddress:{ descAboutHealthPatient: patientPhoneNumber:{
      // photo
    //   var bill = {
    //     amount: $("#amount").val(),
    //     hospitalNumber: $("#hosNum").val(),
    //     hospitalName: $("#hosName").val(),
    //     hospitalAddress: $("#hosAdress").val(),
    //     descAboutHealthPatient: $("#healthDes").val(),
    //     patientNumber
    //     feedBack: $("#feed").val(),
    //   };
      // postedBy:{
      console.log("Request file ---", req.file.path); //Here you get file.
          User.findOneAndUpdate(
             {id:hosBill.id},
             { $push: { hospitalBill:{amount:hosBill.amount,hospitalName:hosBill.hospitalName,
                hospitalPhoneNumber:hosBill.hospitalNumber,hospitalAddress:hosBill.hospitalAddress,
                descAboutHealthPatient:hosBill.descAboutHealthPatient,patientPhoneNumber:hosBill.patientNumber,photo:imgurl
            } } },
            function (error, success) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log(success);
                  }
              });
      /*Now do where ever you want to do*/
      if (!err) {
        return res.send(200).end();
      }
    });
  });
  users.post("/delete", function (req, res) {
      //userid
      console.log(req.body.myData)
    // var id=req.body.id
    var query = { patientPhoneNumber: req.body.myData.billId}
    var str=`hospitalBill.${req.body.myData.billId}`
         User.findOne({id:req.body.myData.userid}).then(function(result){
            console.log(result.hospitalBill.splice(req.body.myData.billId,1))
            result.save()
         })
    //     User.findOneAndDelete(query).then(function(result){
    //     // if(result.hospitalBill[0].amount===0){
    //     // }
    // })
  })
//   users.post('/mypost',(req,res)=>{
//     User.find({id:req.body.myData.id})
//     .populate('postedBy',"_id userName")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
users.post("/load", function (req, res) {
    console.log(req.body);
    var imgurl="";
    upload(req, res, function (err) {
      //  console.log(req.file)
      console.log(req.body.Postdata)
      var foodPost = JSON.parse(req.body.Postdata);
      imgurl+=req.file.path
      console.log(foodPost)
      User.findOneAndUpdate(
          {id:foodPost.id},
          { $push: {FoodCategories:{ descriptionOfPrescription:foodPost.descOfPresc,Category:foodPost.category,
              UserPhoneNumber:foodPost.userNumber,photo:imgurl
         } } },
         function (error, success) {
               if (error) {
                   console.log(error);
               } else {
                   console.log(success);
               }
           });
   /*Now do where ever you want to do*/
   if (!err) {
     return res.send(200).end();
   }
 });
    })
module.exports=users