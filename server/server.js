const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const services = require("./routes");
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGODB_URI;
const CLIENT_HOST = process.env.CLIENT_HOST;

// support
app.use(cookieParser);
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_HOST,
    Credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

// db configuration
mongoose
  .connect(MONGO_DB)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e.message));

// api configuration
app.use("/api/auth", services.authRoute);

// port console
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
