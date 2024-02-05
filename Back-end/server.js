import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import AdminRoute from "./routes/adminRoute.js";
import ProductRoute from './routes/productRoute.js'

// Middlewares
import connectToDatabase from "./config/connection.js";
import logRequestBody from "./middlewares/requestBodyData.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectToDatabase();

// Enable CORS
app.use(cors());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./"));

//Routes
app.use("/api", AdminRoute);
app.use("/api", ProductRoute);

// Middleware to log request details
app.use(logRequestBody);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
