const express=require('express');
const app=express();
const cors=require("cors")
const cookieParser=require("cookie-parser");
const port=process.env.PORT || 5002;
const dbConnection=require("./DB")

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
}))
// app.use(cors());
app.use(cookieParser());
app.use('/api/cars/',require('./routes/carsRoute.js'));
app.use('/api/users/',require('./routes/usersRoute.js'));
app.use('/api/bookings/',require('./routes/bookingRoute.js'));


const path = require('path')

// if(process.env.NODE_ENV==='production')
// {

//     app.use('/' , express.static('client/build'))

//     app.get('*' , (req , res)=>{

//           res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

//     })

// }


app.get('/',(req,res)=>res.send("Hello"));
app.listen(port,()=>console.log('node server start in port '+port));
