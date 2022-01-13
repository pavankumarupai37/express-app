const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const nodemailer=require('nodemailer');
const router=express.Router();
const Product=require('../models/product');

const mailerConfig=nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:"digitalstoreserviceprovider@gmail.com",
        pass:process.env.SENDER_EMAIL_PASS
    },
    secure:true
})


const storageConfig=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=='image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const upload=multer({storage:storageConfig,limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter})


router.get("/",(req,res,next)=>{
Product.find().select('_id name price productImage').then((result)=>{
    if(result){
        res.status(200).json({
            message:'Products retreived successfully',
            products:result
        })
    }
}).catch((err)=>{
    console.log(err)
})    
})

router.post("/",upload.single('productImage'),(req,res,next)=>{
    const product={
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.protocol+'://'+req.get('host')+'/'+req.file.path
    };
    Product.find({name:req.body.name}).then((found)=>{
                if(found.length==1){
                    return res.status(409).json({
                        message:'This product already exists'
                    })
                  
                }else{
                    const productCreated=new Product(product);
                    productCreated.save().then((result)=>{
                        Product.find().then((found)=>{
                            if(found.length==1){
                                const mailData={
                                    from:"digitalstoreserviceprovider@gmail.com",
                                    to:"60umesh.pai@gmail.com",
                                    subject:'Notification about your store',
                                    text:'Congratulations on adding your first product \u{1F44F}!'
                                }
                                mailerConfig.sendMail(mailData,function(err,info){
                                    if(err){
                                        console.log(err)
                                    }else{
                                        res.status(201).json({
                                            message:"Record inserted successfully",
                                            code:201,
                                            data:result,
                                            mailStatus:info
                                    });
                                    }
                                })
                                
                            }else{
                                res.status(201).json({
                                    message:"Record inserted successfully",
                                    code:201,
                                    data:result,
                            });
                            }
                        })
                            
                        
                        }).catch((err)=>{
                        res.status(500).json({
                            message:'Error occured while posting data'
                        })
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
                res.status(500).json({
                    message:'Error occured while finding'
                })
            })
        
    

   
    
})

router.get("/:productID/:productName",(req,res,next)=>{
    const productID=req.params.productID;
    const productName=req.params.productName;
    res.status(200).json({
        message:"Product with your requested ID retrived successfully",
        code:200,
        
    });
})

router.patch("/:productID",(req,res,next)=>{
    const productID=req.params.productID;
    res.status(200).json({
        message:"Department with your requested ID updated successfully",
        code:200,
        updatedProduct:productID
    });
})

router.delete("/:productID",(req,res,next)=>{
    const productID=req.params.productID;
    Product.findByIdAndDelete(productID).then((result)=>{
        if(result){
            res.status(400).json({
                id:productID,
                message:'Product deleted successfully'
            })
            console.log(result)
        }
    }).catch((err)=>{
        res.status(500).json({
            message:'Error occured while deleting'
        })
    })
    
})

module.exports=router;
