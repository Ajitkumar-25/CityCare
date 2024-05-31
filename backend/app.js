const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDB = require("./database/connect");
const loginSignupRoute = require("./routes/loginSignupRoute");
const complaintRoute = require("./routes/complaintRoutes");
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));
app.use(cors({origin: true, credentials: true}));
app.use(
    "/",
    loginSignupRoute,
    complaintRoute
  );

  app.listen(process.env.PORT ? process.env.PORT : 5000, () => {
    console.log(`app listening on PORT ${process.env.PORT}`);
  })