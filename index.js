import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import adminRoute from "./src/routes/admin.routes.js";
import cartRoute from "./src/routes/cart.routes.js";
import orderRoute from "./src/routes/order.routes.js";
import productRoute from "./src/routes/product.routes.js";
import shippingdetailsRoute from "./src/routes/shippingDetail.routes.js";
import userRoute from "./src/routes/user.routes.js";

const app = express();

const corsOptions = {
  origin: [
    "https://shopping-store-frontend-chi.vercel.app",
    "http://localhost:3000",
  ], // your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1", adminRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", shippingdetailsRoute);
app.use("/api/v1", userRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 👇 export app (NO listen)
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
