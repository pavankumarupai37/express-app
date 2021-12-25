import express from 'express';
export const dept=express();


dept.get("/",async(req,res,next)=>{
   await dbRef.collection("Users").find({}).toArray((err,result)=>{
        res.status(200).json({
            message:'Department details retreived successfully',
            code:200,
            data:result
        })
    })
    
})

dept.post("/",(req,res,next)=>{
    const departmentName={
        name:req.body.name
    };
    dbRef.collection("Users").insertOne(departmentName).then((success)=>{
        res.status(201).json({
            message:"Record inserted successfully",
            code:201,
        });

        
    })
    
})

dept.get("/:deptID/:deptName",(req,res,next)=>{
    const deptID=req.params.deptID;
    const deptName=req.params.deptName;
    res.status(200).json({
        message:"Department with your requested ID retrived successfully",
        code:200,
        retrivedDept:{
            deptID:deptID,
            deptName:deptName
        }
    });
})

dept.patch("/:deptID",(req,res,next)=>{
    const deptID=req.params.deptID;
    res.status(200).json({
        message:"Department with your requested ID updated successfully",
        code:200,
        updatedDept:deptID
    });
})

dept.delete("/:deptID",(req,res,next)=>{
    const deptID=req.params.deptID;
    res.status(200).json({
        message:"Department with your requested ID deleted successfully",
        code:200,
        deletedDept:deptID
    });
})
