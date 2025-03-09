const express = require('express');
const  morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const Passport = require('passport');
const cors = require('cors');
const passport = require('./user_routes--/user_route--/crtl_models-/googleOath.js')
const { mongo_Connection } = require('./user_routes--/user_route--/DB/connection.js');
const github = require('./user_routes--/user_route--/crtl_models-/githubOauht.js')
const MongoStore = require('connect-mongo'); 
const session = require('express-session');
const verifyToken = require('./user_routes--/user_route--/Autherization/verifyToken.js')
const new_Cart = require('./user_routes--/user_route--/cart_session/cart_control.js')
require('dotenv').config();
mongo_Connection()



const route = express.Router();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://sanjaykrishna038:mO1fxSmpmRsMFxbC@cluster0.aztv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        collectionName: 'sessions',
           maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }),



    // cookie: {
        //secure: process.env.NODE_ENV === 'production',
        // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // }
}));
app.use(Passport.initialize());
app.use(Passport.session())

app.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
    next();
});

// --------------_----___--_//
app.use( morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
        origin:'https://my-app-clientisde.onrender.com',
        methods:['GET', 'POST', 'DELETE', 'PUT','PATCH'],
        allowedHeaders:['Content-Type','Authorization','Accept'],
        exposedHeaders: ['Access-Control-Allow-Origin'],
        credentials:true // mandoatory for google auths
}));

app.options('*',cors())
// routes
const user_Routes =  require('./user_routes--/user_route--/user_route.js');
const admin_Routes =  require('./user_routes--/admin_route/admin-routes.js');
const exp = require('constants');
app.use('/uploads', express.static('uploads'))

app.use( morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
        origin:'https://my-app-clientisde.onrender.com',
        methods:['GET', 'POST', 'DELETE', 'PUT','PATCH'],
        allowedHeaders:['Content-Type','Authorization','Accept'],
        exposedHeaders:['Access-Control-Allow-Origin'],
        credentials:true // mandoatory for google auths
}));

app.options('*',cors())

/// rout middleware 
app.use('/user_side',user_Routes)
app.use('/admin_side',admin_Routes)

//error
// app.use((req,res,next)=>{
    // const error = new Error("not found");
    // error.status = 404;
    // next(error);
// })

app.use(express.static('dist', {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));

app.listen(4000,()=>{
    console.log("server is running on port 4000");
})
