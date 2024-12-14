const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGODB_URI;
const CLIENT_HOST = process.env.CLIENT_HOST;

// support
app.use(
  cors({
    origin: CLIENT_HOST,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// db configuration
mongoose
  .connect(MONGO_DB)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e.message));

// port console
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
