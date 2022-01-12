const express=require('express');
const router=express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Orders retreived successfully",
        code:200
    })
})

router.post("/",(req,res,next)=>{
    const order={
        name:req.body.name,
    };
    res.status(201).json({
        message:"Order created successfully",
        createdOrder:order,
        code:201
    });
})

router.get("/:orderID",(req,res,next)=>{
    const orderID=req.params.orderID;
    if(empId=="1234"){
        res.status(200).json({
            message:"Order with your requested ID is retrieved",
            code:200,
            retrivedEmployee:orderID
        })
    }else{
        res.status(404).json({
            message:"Order with requested ID not found",
            code:404
        });
    }
    
})

router.patch("/:orderID",(req,res,next)=>{
    const orderID=req.params.orderID;
    res.status(200).json({
        message:"Order with requested ID updated successfully",
        code:200,
        updatedOrder:{
            id:orderID
        }
    });
})

router.delete("/:orderID",(req,res,next)=>{
    const orderID=req.params.orderID;
    res.status(200).json({
        message:"Order with requested ID deleted successfully",
        code:200,
        deletedOrder:orderID
    });
})

module.exports=router;