import express from 'express';
export const employeeDetails=express.Router()

employeeDetails.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Employee details retreived successfully",
        code:200
    })
})

employeeDetails.post("/",(req,res,next)=>{
    const empDetails={
        name:req.body.name,
        empCode:req.body.empCode
    };
    res.status(201).json({
        message:"Employee created successfully",
        createdEmployee:empDetails,
        code:201
    });
})

employeeDetails.get("/:employeeID",(req,res,next)=>{
    const empId=req.params.employeeID;
    if(empId=="1234"){
        res.status(200).json({
            message:"Employee with your requested ID is retrieved",
            code:200,
            retrivedEmployee:empId
        })
    }else{
        res.status(404).json({
            message:"Employee with requested ID not found",
            code:404
        });
    }
    
})

employeeDetails.patch("/:employeeID",(req,res,next)=>{
    const empID=req.params.employeeID;
    res.status(200).json({
        message:"Employee with requested ID updated successfully",
        code:200,
        updatedEmp:{
            empID:empID
        }
    });
})

employeeDetails.delete("/:employeeID",(req,res,next)=>{
    const empID=req.params.employeeID;
    res.status(200).json({
        message:"Employee with requested ID deleted successfully",
        code:200,
        deletedEmp:empID
    });
})