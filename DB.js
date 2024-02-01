const mongoose = require("mongoose");
 function connectDB(){
    mongoose.connect("mongodb+srv://balashekaran:%40Bala2003.@atlascluster.qy9og5j.mongodb.net/rental-Info")

    const connection=mongoose.connection;
    connection.on("connected",()=>{
        console.log("Mongo DB succesfully connected");
    })
    connection.on("error",()=>{
        console.log("Mongo Db error connection");
    })
 }
 
 connectDB();
 
 module.exports=mongoose;