const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const Passport = require('passport');
const cors = require('cors');
const passport = require('./user_routes--/user_route--/crtl_models-/googleOath.js')
const { mongo_Connection } = require('./user_routes--/user_route--/DB/connection.js');
const github = require('./user_routes--/user_route--/crtl_models-/githubOauht.js');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const verifyToken = require('./user_routes--/user_route--/Autherization/verifyToken.js');
const new_Cart = require('./user_routes--/user_route--/cart_session/cart_control.js');
const port = 4000;
require('dotenv').config();
mongo_Connection();

const route = express.Router();
app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.db_storage,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 * 1000 // 24 hours
  }),
  cookie:{
    httpOnly:true,
    secure:false,
    sameSite:'lax',
    maxAge:24*60*60*1000
  }
}));
app.use(Passport.initialize());
app.use(Passport.session())

// app.use((req, res, next) => {
  // console.log('Session ID:', req.sessionID);
  // console.log('Session:', req.session);
  // next();
// });

// routes
const user_Routes = require('./user_routes--/user_route--/user_route.js');
const admin_Routes = require('./user_routes--/admin_route/admin-routes.js');
const exp = require('constants');

app.use('/uploads', express.static('uploads'))
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8383'],
  credentials: true, // mandoatory for google auths
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  //exposedHeaders:['Access-Control-Allow-Origin'],
  exposedHeaders: ['Authorization'],
}));



/// rout middleware 
app.use('/user_side', user_Routes)
app.use('/admin_side', admin_Routes)


app.listen(port, () => {
  console.log("server is running on port 4000");
})
