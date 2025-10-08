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
import googleRouter from "./user_routes--/user_route--/crtl_models-/googleOath.js";
import githubRouter from "./user_routes--/user_route--/crtl_models-/githubOauht.js";
import verifyToken from "./user_routes--/user_route--/Autherization/verifyToken.js";
import new_Cart from "./user_routes--/user_route--/cart_session/cart_control.js";
import user_Routes from "./user_routes--/user_route--/user_route.js";
import admin_Routes from "./user_routes--/admin_route/admin-routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// ------------------------------
// 🧠 MongoDB Connection
// ------------------------------
mongo_Connection();

// ------------------------------
// 🧩 Middleware
// ------------------------------
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ------------------------------
// 🌐 CORS (Cross-Origin Resource Sharing)
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
// 🍪 Sessions (required for OAuth)
// ------------------------------
app.set("trust proxy", 1); // for Render/HTTPS cookies

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.db_storage,
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: true, // for HTTPS
      sameSite: "None", // required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ------------------------------
// 🔐 Passport Initialization
// ------------------------------
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------
// 📦 Static + API Routes
// ------------------------------
app.use("/uploads", express.static("uploads"));

// OAuth routes
app.use("/auth/google", googleRouter);
app.use("/auth/github", githubRouter);

// User + Admin routes
app.use("/user_side", user_Routes);
app.use("/admin_side", admin_Routes);

// Example protected route (optional)
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

// ------------------------------
// 🚀 Server Start
// ------------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
