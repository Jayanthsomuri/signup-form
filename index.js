const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
//Parsing ,syntax analysis is the process of analyzing a string of symbols,
// either in natural language

//Body-parser is the Node. js body parsing middleware. It is responsible for parsing the incoming request 
//bodies in a middleware before you handle it.
const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/mydb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    //using these expection to not to catch any error
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log('connected to database'))

app.post("/sign_up",(req,res)=>{
 var name=req.body.name;
 var email=req.body.email;
 var phno=req.body.phno;
 var password=req.body.password;

 var data={
     "name":name,
     "email":email,
     "phno":phno,
     "password":password
    
 }
 db.collection('users').insertOne(data,(err,collection)=>{
     if(err){
         throw err;
     }
     console.log("Record inserted succesfully");
 });
 return res.redirect('signup_sucess.html')
})
app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect("index.html")
})
app.listen(5000,()=>{
    console.log("Server is running on 5000..:)");
})