const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));//fetching static files
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const first=req.body.fName;
    const last=req.body.lName;
    const email=req.body.email;
    const data={members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
            FNAME: first,
            LNAME: last,
        }
      }
    ] 
};
const url="https://us10.api.mailchimp.com/3.0/lists/30275cbcb7";
const options={
    method: "POST",
    auth:"ritwiza1:e661025cdd734003a876a4d895097c1b-us10"
}
const json=JSON.stringify(data);

const request=https.request(url, options, function(response){//yahan hume external api se data lena nahi hai balki post krna hai
if(response.statusCode===200){
res.sendFile(__dirname+"/success.html");
}else{
    res.sendFile(__dirname+"/failure.html");
}
    response.on("data",function(data){
   console.log(JSON.parse(data));
})
})

request.write(json);
request.end();
    // console.log( first, last, email);
});
app.post("/failure",function(req,res){
 res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});
//66598fd5e251bee77bd3072fa0a58c38-us10
