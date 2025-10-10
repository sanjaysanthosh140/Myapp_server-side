const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const body_parser = require("cookie-parser")
const Passport = require('passport');
const cors = require('cors');
const passport = require('./user_routes--/user_route--/crtl_models-/googleOath.js')
const { mongo_Connection } = require('./user_routes--/user_route--/DB/connection.js');
const github = require('./user_routes--/user_route--/crtl_models-/githubOauht.js');
//const MongoStore = require('connect-mongo');
//const session = require('express-session');
const verifyToken = require('./user_routes--/user_route--/Autherization/verifyToken.js');
const new_Cart = require('./user_routes--/user_route--/cart_session/cart_control.js');
const port = 4000;
require('dotenv').config();
mongo_Connection();

//const route = express.Router();
// Add error handling for MongoStore
const session = require('express-session');
const MongoStore = require('connect-mongo');
// app.use(session({
// secret: process.env.SESSION_SECRET || 'secrete', // Use env variable
// resave: false,
// saveUninitialized: false,
// store: MongoStore.create({
// mongoUrl: process.env.db_storage,
// collectionName: 'sessions',
// ttl: 24 * 60 * 60, // 24 hours in seconds (correct format)
// autoRemove: 'native', // Optional
// mongoOptions: {
// useNewUrlParser: true,
// useUnifiedTopology: true
// }
// }),
// cookie: {
// httpOnly: true,
// secure: true, // Set to true in production with HTTPS
// sameSite: 'none',
// maxAge: 24 * 60 * 60 * 1000
// }
// }));
const twentyFourHoursFromNow = new Date(Date.now() + (24 * 60 * 60 * 1000))
//const route = express.Router();
app.use(session({
  secret: 'secret',
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://sanjaykrishna038:mO1fxSmpmRsMFxbC@cluster0.aztv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    collectionName: 'sessions',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }),
  resave: false,
  proxy: true,
  saveUninitialized: false,
  expiration: twentyFourHoursFromNow,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    //httpOnly: false,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  }
}));
app.use(Passport.initialize());
app.use(Passport.session())

app.use((req, res, next) => {
  console.log('###############Session ID:', req.sessionID);
  console.log('##############Session:', req.session);
  next();
});

// routes
const user_Routes = require('./user_routes--/user_route--/user_route.js');
const admin_Routes = require('./user_routes--/admin_route/admin-routes.js');
const exp = require('constants');
const cookieParser = require('cookie-parser');

app.use('/uploads', express.static('uploads'))
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.json(cookieParser())

// app.use(cors({
// origin: [
// 'https://saastoola-b3f60.web.app',
// 'https://saastoola-b3f60.firebaseapp.com', // ← ADD THIS LINE
// 'https://grahql-apollo-server.onrender.com',
// 'https://myapp-server-side-rafv.onrender.com' // ← ADD THIS LINE
// ],
// credentials: true,
// methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'], // ← ADD 'OPTIONS'
// allowedHeaders: ['Content-Type', 'Authorization'] // ← REMOVE 'Cookie', 'Set-Cookie'
// ← REMOVE exposedHeaders entirely
// }));
app.use(cors({
  origin: ['https://saastoola-b3f60.web.app', 'https://grahql-apollo-server.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  exposedHeaders: ['Authorization'],
}));

/// rout middleware 
app.use('/user_side', user_Routes)
app.use('/admin_side', admin_Routes)


app.listen(port, '0.0.0.0', () => {
  console.log("server is running on port 4000");
})  