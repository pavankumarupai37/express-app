const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Product=require('../models/product');

router.get("/",(req,res,next)=>{
Product.find().select('_id name price').then((result)=>{
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

router.post("/",(req,res,next)=>{
    const product={
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    };
    Product.find({name:req.body.name}).then((found)=>{
        if(found.length==1){
            return res.status(409).json({
                message:'This product already exists'
            })
          
        }else{
            const productCreated=new Product(product);
            productCreated.save().then((result)=>{
                res.status(201).json({
                    message:"Record inserted successfully",
                    code:201,
                    data:result
            });
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
