import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
import stripePaymentRouter from "./routers/stripePaymentRouter.js";
app.use("/api/payment", stripePaymentRouter);

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running at http://localhost:${PORT}`);
});
