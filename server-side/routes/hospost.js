const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const HospitalPost = require('../../db/mongo');

router.get('/allpost',(req,res)=>{
    HospitalPost.find()
    .populate('postedBy',"_id userName")
    .then(post=>{
        res.json({post})
        
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/createHospitalPost',(req,res) =>{
    const {amount,hospitalName,hospitalPhoneNumber, hospitalAddress,descAboutHealthPatient,patientPhoneNumber,photo} = req.body
    if(!amount || !hospitalName || !hospitalPhoneNumber || !hospitalAddress || !descAboutHealthPatient || !patientPhoneNumber || !photo){
        return res.status(422).json({error:"Please add all the fields"})
    }

    const post = new Post({
        amount,
        hospitalName,
        hospitalPhoneNumber,
        hospitalAddress,
        descAboutHealthPatient,
        patientPhoneNumber,
        photo,
        postedBy:req.user   //=> to know who put this post 
    })
    post.save().then(result =>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

// // the user can see all his posts
// router.post('/mypost',(req,res)=>{
//     HospitalPost.find({id:req.body.myData.id})
//     .populate('postedBy',"_id userName")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
  
  app.listen(port, () => {
    console.log("listening to port 8000");
  });


module.exports = router