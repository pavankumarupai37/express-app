const express=require('express');
const mongoose=require('mongoose');
const bcrpyt=require('bcrypt');
const jwt=require('jsonwebtoken');
const fs=require('fs');
const nodemailer=require('nodemailer');
const router=express.Router();

const UserModel=require('../models/user');

const mailerConfig=nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:"digitalstoreserviceprovider@gmail.com",
        pass:process.env.SENDER_EMAIL_PASS
    },
    secure:true
})

router.post('/register',(req,res,next)=>{
    bcrpyt.hash(req.body.password,10,function(error,hash){
        if(error){
            res.status(404).json({
                message:'Could not store password'
            })
        }else{
            let userData={
                _id:new mongoose.Types.ObjectId(),
                name:req.body.name,
                phone_no:req.body.phone_no,
                email:req.body.email,
                password:hash,
                role:req.body.role
            }
            
            UserModel.find({role:req.body.role}).then((found)=>{
                if(found.length==1&&found[0].role=='Store Manager'){
                    res.status(409).json({
                        error:'Store Manager already exists',
                    })
                }else{
                    let createdUser=new UserModel(userData)
                    createdUser.save().then((result)=>{
                           let mailData={
                            from:"digitalstoreserviceprovider@gmail.com",
                            to:result.email,
                            subject:'Account created successfully',
                            text:'Congratulations! You have successfully created your account'
                        }
                        
                        mailerConfig.sendMail(mailData,function(err,info){
                            if(err){
                                res.status(201).json({
                                    message:'User created',
                                    data:result,
                                    mailStatus:err
                            })  
                            }else{
                                res.status(201).json({
                                    message:'User created',
                                    data:result,
                                    mailStatus:info
                            }) 
                            }
                        })
                        
                    }).catch((err)=>{
                        res.status(500).json({
                            error:'Failed to create user',
                            details:err
                        })
                    })
                }
            }).catch((err)=>{
                console.log(err)
              
            })
            
        }
    })
    
})

router.post('/login',(req,res,next)=>{
    UserModel.find({email:req.body.email}).then((found)=>{
        if(found.length==1){
        let passwordDb=found[0].password
        console.log('dddddddd',passwordDb)
        bcrpyt.compare(req.body.password,passwordDb,function(error,hash){
            console.log('err------>'+error+"     "+'succ------->'+hash)
            if(error){
                console.log(error)
                        res.status(401).json({
                            message:'Something went wrong while checking user',
                        })
                
                
            }else{
                if(hash){
                let token= jwt.sign(
                    {
                    email:found[0].email,
                    id:found[0]._id
                    },
                    process.env.API_KEY,
                    {
                        expiresIn:"1h"
                    })
                res.status(200).json({
                    message:'Login successfull',
                    token:token
                })
            }else{
                res.status(401).json({
                    message:'You are not authorized to use our app',
                })
        
            }
        }
        })
        }else{
       res.status(404).json({
           error:'User not found'
       }) 
    }
    })
})

module.exports=router;