const express=require('express');
const app=express();
require('dotenv').config();

//API imports
const orderRoutes=require('./api/orders')
const productsRoutes=require('./api/products');
const userRoutes=require('./api/users');

//Middleware (requests conversion to json)
app.use(express.json())
app.use('/uploads',express.static('uploads'))

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
app.use('/orders',orderRoutes)
app.use('/products',productsRoutes)
app.use('/user',userRoutes)

//Error handling
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Requested URL not found",
        code:404
    })
})

module.exports=app;