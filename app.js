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

import * as google from "./user_routes--/user_route--/crtl_models-/googleOath.js";
import * as github from "./user_routes--/user_route--/crtl_models-/githubOauht.js";

import verifyToken from "./user_routes--/user_route--/Autherization/verifyToken.js";
import new_Cart from "./user_routes--/user_route--/cart_session/cart_control.js";
import user_Routes from "./user_routes--/user_route--/user_route.js";
import admin_Routes from "./user_routes--/admin_route/admin-routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// 🧠 Connect MongoDB
mongo_Connection();

// ----------------------------------------
// 1️⃣ TRUST PROXY — Required for Render HTTPS cookies
// ----------------------------------------
app.set("trust proxy", 1);

// ----------------------------------------
// 2️⃣ MIDDLEWARE
// ----------------------------------------
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ----------------------------------------
// 3️⃣ CORS CONFIGURATION — allow Firebase ↔ Render communication
// ----------------------------------------
const allowedOrigins = [
  "https://saastoola-b3f60.web.app",
  "https://saastoola-b3f60.firebaseapp.com",
  "https://my-app-clientisde-rf1p-lejlrl2w0-sanjaysanthosh140s-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ----------------------------------------
// 4️⃣ EXPRESS SESSION (OAuth2 USERS)
// ----------------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.db_storage,
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // 24 hours
    }),
    cookie: {
      httpOnly: true,    // hides from JS
      secure: true,      // HTTPS only
      sameSite: "none",  // allow cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ----------------------------------------
// 5️⃣ PASSPORT INITIALIZATION
// ----------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------------------
// 6️⃣ ROUTES
// ----------------------------------------
app.use("/uploads", express.static("uploads"));
app.use("/user_side", user_Routes);
app.use("/admin_side", admin_Routes);

// ✅ OAuth Routers (handle Google & GitHub login)
app.use("/auth/google", google.default || google);
app.use("/auth/github", github.default || github);

// ----------------------------------------
// 7️⃣ SERVER START
// ----------------------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running securely on port ${port}`);
});
