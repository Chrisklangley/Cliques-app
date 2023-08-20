require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("./cloudinary.config");
const upload = multer({ dest: "uploads/" });

const mongoose = require("mongoose");
const { MONGOOSE_URI } = process.env;
const { addImg, getImg, uploadToCloudinary } = require("./controller");
app.use(express.json());
app.use(cors());
const port = 4592;
app.use(bodyParser.json({ limit: "60mb" }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));

mongoose
  .connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.post("/upload", upload.single("file"), uploadToCloudinary);

app.post("/addImg", upload.single("file"), addImg);
app.get("/getImage/:Id", getImg);
app.get("/", (req, res) => {
  console.log("hit");
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
