const express= require("express");

const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(request, res){
   res.sendFile(__dirname + "/index.html");
   
})
app.post("/",function(req,res){
   const query= req.body.cityName;
   const apikey= "ca82490f6892d0a1f912032b97e6d4ba";
  
   const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apikey+"&units=metric";
   https.get(url,function(response){
  
      response.on("data",function(data){
       var weatherData = JSON.parse(data);
       var temp=weatherData.main.temp;
       var  feels_like=weatherData.main.feels_like;
       var  description =weatherData.weather[0].description;
        res.write("<p>the weather description is " + description +"</p>");
       res.write("<h1>temp in "+query+" is "+temp +" degree celcius</h1>");
        res.send();
      })
   }) 
})




app.listen(3000);
