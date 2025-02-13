const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
let token = req.header('Authorization')?.split(' ')[1]; // Removes 'Bearer '

    if(!token)
    {
        return res.status(401).json({msg: 'Access denied no token provided'});
    }
    try {
        let decode = jwt.verify(token,'kapilcalled');
        req.user = decode.user;
        next();
    } catch (err) {
        console.error("Token verification failed");
        res.status(401).json({msg: 'Invalid token'})
    }
   
    });
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
