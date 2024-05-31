var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

var loginSignupController = require("../controller/loginSignupController");
const auth = require("../middleware/auth");
//session
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());

router.post("/api-logout", function (req, res) {
    req.session.destroy();
    res.json("logout success");
  });

  router.post("/api_send_otp", loginSignupController.api_send_otp);
  router.post("/api_verify_otp", loginSignupController.api_verify_otp);
  router.post("/api_citizen_registration", loginSignupController.api_citizen_registration)
  router.post("/api_citizen_login", loginSignupController.api_citizen_login);
  router.post("/api_organization_registration", loginSignupController.api_organization_registration)
  router.post("/api_organization_login", loginSignupController.api_organization_login);

module.exports = router;


  //2DULT62PHCFMYQBDE6AX1UGU

