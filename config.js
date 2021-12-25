import http from 'http';
import {app} from './app.js';
import MongoClient from 'mongodb/lib/mongo_client.js';


const PORT=process.env.PORT ||9095;
const url="mongodb+srv://pavan:Temp!123@cluster0.ezaop.mongodb.net/Student?retryWrites=true&w=majority";

const handleRequest=http.createServer(app);
let db;

MongoClient.connect(url,function(err,res){
    if(err){
        console.log("Something broke.Please try again")
    }else{
        console.log('Connected to database')
        handleRequest.listen(PORT,()=>{
            console.log('Listening')
        })
        db=res.db('Student')
        global.dbRef=db
    }
})





