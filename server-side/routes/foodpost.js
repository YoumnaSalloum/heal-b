// const express = require('express')
// const router = express.Router()
// const mongoose = require('mongoose')
// const FoodPost = require('../../db/mongo');

// router.get('/allpost',(req,res)=>{
//     FoodPost.find()
//     .populate('postedBy',"_id userName")
//     .then(posts=>{
//         res.json({posts})
        
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

// router.post('/createFoodPost',(req,res) =>{
//     const {descriptionOfPrescription,Category,UserPhoneNumber} = req.body
//     if(!descriptionOfPrescription || !Category || !UserPhoneNumber){
//         return res.status(422).json({error:"Please add all the fields"})
//     }

//     const post = new Post({
//         descriptionOfPrescription,
//         Category,
//         UserPhoneNumber,
//         postedBy:req.user   //=> to know who put this post 
//     })
//     post.save().then(result =>{
//         res.json({post:result})
//     })
//     .catch(err =>{
//         console.log(err)
//     })
// })

// // the user can see all his posts
// router.get('/mypost',(req,res)=>{
//     FoodPost.find({postedBy:req.user._id})
//     .populate('postedBy',"_id userName")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

// module.exports = router