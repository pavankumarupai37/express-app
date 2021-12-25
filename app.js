import express from 'express';
export const app=express();

//API imports
import {dept} from './api/department.js';
import {employeeDetails} from './api/employeeDetails.js';

//Middleware (requests conversion to json)
app.use(express.json())

//Handle CORS errors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type');
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,PATCH,DELETE,GET,POST');
        return res.status(200).json({})
    }
    next();
})

//Middlewares (API routing)
app.use('/department',dept)
app.use('/employeeDetails',employeeDetails)

//Error handling
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Requested URL not found",
        code:404
    })
})