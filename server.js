const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let authenticate = (req, res, next) => {
  console.log("inside authenticate middleware");

  console.log(req.headers.authorization);

  next();
};

const upload = multer({ storage: storage });
let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(authenticate);
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.post("/signup", upload.array("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log("uploaded files from the user are");
  console.log(req.files);

  let usersArr = await User.find().and({ email: req.body.email });

  if (usersArr.length > 0) {
    res.json({ status: "failure", msg: "User already exists" });
  } else {
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);

      let newUser = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: hashedPassword,
        mobileNo: req.body.mobileNo,
        profilePic: req.files[0].path,
      });

      await newUser.save();
      res.json({ status: "success", msg: "User created successfully" });
    } catch (err) {
      console.log("Unable to save user");
      res.json({ status: "failure", msg: err });
    }
  }
});

app.post("/updateProfile", upload.array("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    console.log("uploaded files from the user are");
    console.log(req.files);

    await User.updateMany(
      { email: req.body.email },
      {
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        profilePic: req.files[0].path,
      }
    );

    res.json({ status: "success", msg: "user profile updated successfully" });
  } catch (err) {
    console.log("Unable to save user");
    res.json({ status: "failure", msg: err });
  }
});

app.post("/validateLogin", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await User.find().and({ email: req.body.email });

  console.log(userDetails);

  if (userDetails.length > 0) {
    // if (userDetails[0].password == req.body.password) {

    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );

    if (isPasswordCorrect == true) {
      let objToEncrypt = { email: req.body.email, password: req.body.password };

      let genratedToken = jwt.sign(objToEncrypt, "lalala");

      res.json({
        status: "success",
        data: userDetails[0],
        token: genratedToken,
      });
    } else {
      res.json({ status: "error", msg: "email or password is wrong." });
    }
  } else {
    res.json({ status: "error", msg: "user doesnot exist" });
  }
});

app.post("/validateLoginThruToken", upload.none(), async (req, res) => {
  console.log(req.body.token);

  try {
    let decodedToken = jwt.verify(req.body.token, "lalala");
    console.log(decodedToken);

    let userDetails = await User.find().and({ email: decodedToken.email });

    console.log(userDetails);

    if (userDetails.length > 0) {
      let isPasswordCorrect = await bcrypt.compare(
        decodedToken.password,
        userDetails[0].password
      );

      if (isPasswordCorrect == true) {
        res.json({
          status: "success",
          data: userDetails[0],
        });
      } else {
        res.json({ status: "error", msg: "email or password is wrong." });
      }
    } else {
      res.json({ status: "error", msg: "user doesnot exist" });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "something is wrong", err: err });
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    await User.deleteMany({ email: req.query.email });
    console.log("User deleted successfully");
    res.json({ status: "success", msg: "User deleted successfully" });
  } catch (err) {
    console.log("Unable to delete user");
  }
});

app.listen(process.env.port, () => {
  console.log(`Listening to port ${process.env.port}`);
});

let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

let insertUserIntoDB = async () => {};

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.dbPath);

    console.log("Connected to MDB successfully");

    // insertUserIntoDB();
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();
