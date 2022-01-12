const http=require('http');
const app=require('./app')
const mongoose=require('mongoose');

const PORT=process.env.PORT ||9095;
const url="mongodb+srv://pavan:Temp!123@shopcluster.okgo6.mongodb.net/GaneshStores?retryWrites=true&w=majority";

const handleRequest=http.createServer(app);

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err,res){
    if(err){
        console.log("Something broke.Please try again",err)
    }else{
        console.log('Connected to database')
        handleRequest.listen(PORT,()=>{
            console.log('Listening')
        })
        
    }
})





