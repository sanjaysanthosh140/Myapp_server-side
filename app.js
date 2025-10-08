import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { mongo_Connection } from "./user_routes--/user_route--/DB/connection.js";

const Passport = require('passport');
const google = require('./user_routes--/user_route--/crtl_models-/googleOath.js')
//const { mongo_Connection } = require('./user_routes--/user_route--/DB/connection.js');
const github = require('./user_routes--/user_route--/crtl_models-/githubOauht.js');
//const MongoStore = require('connect-mongo');
//const session = require('express-session');
const verifyToken = require('./user_routes--/user_route--/Autherization/verifyToken.js');
const new_Cart = require('./user_routes--/user_route--/cart_session/cart_control.js');



dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// 🧠 Mongo connection
mongo_Connection();

// ------------------------------
//  1️⃣ MIDDLEWARE
// ------------------------------
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ------------------------------
//  2️⃣ CORS CONFIG — REQUIRED for Firebase ↔ Render
// ------------------------------
const allowedOrigins = [
  "https://saastoola-b3f60.web.app",
  "https://saastoola-b3f60.firebaseapp.com",
  "https://my-app-clientisde-rf1p-lejlrl2w0-sanjaysanthosh140s-projects.vercel.app",
  "https://myapp-server-side-rafv.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ------------------------------
//  3️⃣ SESSION FOR OAUTH USERS
// ------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.db_storage,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: true,         // required for HTTPS
      sameSite: "None",     // required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ------------------------------
//  4️⃣ PASSPORT INIT (OAuth2)
// ------------------------------
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------
//  5️⃣ ROUTES
// ------------------------------
import user_Routes from "./user_routes--/user_route--/user_route.js";
import admin_Routes from "./user_routes--/admin_route/admin-routes.js";

app.use("/uploads", express.static("uploads"));
app.use("/user_side", user_Routes);
app.use("/admin_side", admin_Routes);

// ------------------------------
//  6️⃣ START SERVER
// ------------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
