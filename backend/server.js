import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import qaRoute from "./routes/qa.route.js";
import quizRoute from "./routes/quiz.route.js";
import uploadRoute from "./routes/upload.route.js";
import authRoute from "./routes/auth.route.js";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./config/passport.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,                 
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/qa", qaRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});