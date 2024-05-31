var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Citizen = require("../models/citizen");
const Organization = require("../models/organization");



// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNTID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken, {lazyLoading: true});

// client.verify.v2.services
//                 .create({friendlyName: 'My First Verify Service'})
//                 .then(service => console.log(service.sid));


const api_send_otp = async (req, res) => {
    try {
        let { countryCode, phoneNumber} = req.body;
        countryCode = "91";
        phoneNumber = "8306770819"
        try{
            const otpResponse = await client.verify.v2
            .services (verifySid)
            .verifications.create({
            to:`+${countryCode}${phoneNumber}`,
            channel: "sms",
            });
            console.log("otpResponse", otpResponse)
            res.status(200).send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`); }
            catch(error) {
                res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
            }
    }
    catch(error) {
        console.log(error);
        res.send("error", error);
    }
}

const api_verify_otp = async (req, res) => {
    try {
        let {countryCode, phoneNumber, otp} = req.body;
        countryCode = "91";
        phoneNumber = "8306770819"
        const verifiedResponse = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+${countryCode}${phoneNumber}`, code: otp })
        res.status(200).send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}`);
    }
    catch(error) {
        console.log("error", error);
        res.send(error);
    }
}


const api_citizen_registration = async (req, res) => {
    try {
    //   if (
    //     !req.body.hasOwnProperty("user_type") ||
    //     !req.body.hasOwnProperty("fname") ||
    //     !req.body.hasOwnProperty("lname") ||
    //     !req.body.hasOwnProperty("email") ||
    //     !req.body.hasOwnProperty("mobile") ||
    //     !req.body.hasOwnProperty("dob") ||
    //     !req.body.hasOwnProperty("gender") ||
    //     !req.body.hasOwnProperty("pincode") ||
    //     !req.body.hasOwnProperty("locality") ||
    //     !req.body.hasOwnProperty("city") ||
    //     !req.body.hasOwnProperty("state") ||
    //     !req.body.hasOwnProperty("country") ||
    //     !req.body.hasOwnProperty("check") ||
    //     !req.body.hasOwnProperty("otp") ||
    //     !req.body.hasOwnProperty("fcm_token")
    //   ) {
    //     res.status(400).json({
    //       success: false,
    //       error: "Bad Request, Parameters missing",
    //     });
    //     return;
    //   }
      const auser = await Citizen.findOne({ mobile: req.body.mobile });
      const buser = await Citizen.findOne({ email: req.body.email });
      console.log(auser);
      
      if (auser || buser) {
          res
          .status(404)
          .json({
            success: false,
            status: "failed",
            message: "user already exists",
            token: auser.token
          });
        return;
    } else {

        var user = new Citizen({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          mobile: req.body.mobile,
          pincode: req.body.pincode,
          locality: req.body.locality,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          password: req.body.password
        });
  
        user
          .save(user)
          .then(async (user) => {
            const userId = user._id.toString();
            const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, {
                expiresIn: "4320h",
              });
    
              const tokenSave = await Citizen.findOneAndUpdate(
                {
                  _id: user._id,
                },
                { token: token }
              );


              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
              },
            });
    
            const mailOptions = {
                from: process.env.SMTP_MAIL, // sender address
                to: `${user.email}`, // list of receivers
                subject: "Message from CITY CARE", // Subject line
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title></title>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        table {
                            border: 0;
                            border-spacing: 0;
                        }
                        a {
                            text-decoration: none !important;
                        }
                        .main-mail-box {
                            font-family: 'Montserrat', sans-serif;
                            color: #090909;
                            font-size: 16px;
                        }
                        .logo-box {
                            width: 23.5%;
                        }
                        .line-box {
                            width:76.5%;
                            padding-left: 10%;
                        }
                        .title {
                            font-size: 2.7vw;
                            line-height: 1.22;
                            color: #265A75;
                            font-weight: bold;
                            font-family: 'Montserrat', sans-serif;
                            text-transform: capitalize;
                            margin: 0;
                        }
                        .text p {
                            font-size: 2.4vw;
                            line-height: 1.37;
                            color: #090909;
                            margin-bottom: 4.2vw;
                        }
                        .text p:last-child {
                            margin-bottom: 0;
                        }
                        .btn {
                            display: inline-block;
                            background: #215C7A;
                            border-radius: 100px;
                            text-align: center;
                            padding: 1.9vw 5.51vw;
                            font-size: 2.7vw;
                            line-height: 1.22;
                            color: #ffffff;
                            font-weight: bold;
                            text-decoration: none !important;
                        }
                        .title2 {
                            font-size: 4.113vw;
                            line-height: 1.216;
                            color: #265A75;
                            font-weight: bold;
                            font-family: 'Montserrat', sans-serif;
                            display: inline-block;
                            padding-right: 1.4vw;
                            background: #ffffff;
                            margin: 0;
                            position: relative;
                            z-index: 1;
                        }
                        .title-line {
                            display: inline-block;
                            width: 100%;
                            height: 5.3%;
                            background: #265A75;
                            position: absolute;
                            bottom: 28%;
                            left: 0;
                        }
                        .help-box {
                            width:30%; 
                            padding-right: 3.1%; 
                            padding-bottom: 30px;
                        }
                        .mail-box {
                            width:40%; 
                            padding: 0 3% 30px 3%; 
                            border-left: 3px solid #707070; 
                            border-right: 3px solid #707070;
                        }
                        .site-box {
                            width:30%;
                            padding-left: 2.5%;
                            padding-bottom: 30px;
                        }
                        .getin-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            color: #090909;
                            margin-bottom: 14px;
                        }
                        .call-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            font-weight: bold;
                            color: #090909;
                            font-family: 'Roboto', sans-serif;
                        }
                        .mail-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            font-weight: bold;
                            color: #265A75;
                            font-family: 'Roboto', sans-serif;
                        }
                        .site-text {
                            font-size: 2.134vw;
                            line-height: 1.2;
                            color: #090909;
                            font-family: 'Roboto', sans-serif;
                        }
                        .social-icon {
                            display: inline-block;
                            margin-top: 1vw;
                        }
                        .social-icon a {
                            display: inline-block;
                            margin-right: 15px;
                        }
                        .social-icon a img {
                            width: 2.66vw;
                            height: auto;
                        }
                        @media screen and (max-width: 767px) {
                            .logo-box {
                                width: 40%;
                            }
                            .line-box {
                                width: 60%;
                                padding-left: 10%;
                            }
                            .title {
                                font-size: 20px;
                                line-height: 35px;
                            }
                            .text p {
                                font-size: 14px;
                                line-height: 24px;
                            }
                            .btn {
                                padding: 5px 20px;
                                font-size: 14px;
                                line-height: 24px;
                            }
                            .title2 {
                                font-size: 22px;
                                line-height: 32px;
                                padding-right: 20px;
                            }
                            .help-box {
                                width: 100%; 
                                padding-right: 0; 
                                padding-bottom: 10px;
                            }
                            .mail-box {
                                width:100%; 
                                padding: 10px 0;
                                border-left: 0; 
                                border-right: 0;
                                border-top: 1px solid #707070; 
                                border-bottom: 1px solid #707070;
                            }
                            .site-box {
                                width:100%;
                                padding-left: 0;
                                padding-bottom: 0;
                                padding-top: 10px;
                            }
                            .social-icon a {
                                margin-right: 10px;
                            }
                            .social-icon a img {
                                width: 30px;
                                height: auto;
                            }
                            .getin-text {
                                font-size: 16px;
                                line-height: 26px;
                                margin-bottom: 5px;
                            }
                            .getin-text img {
                                width: 14px !important;
                                height: auto !important;
                                margin-right: 10px !important;
                            }
                            .call-text,
                            .mail-text {
                                font-size: 18px;
                                line-height: 28px;
                            }
                            .site-text {
                                font-size: 16px;
                                line-height: 26px;
                            }
                            .social-icon {
                                margin-top: 15px;
                            }
                        }
                    </style>
                    <!--[if !mso]>-->
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
                    <!--<![endif]-->
                </head>
                
                <body>
                    <div class="main-mail-box">
                        <table width="100%" style="padding: 7% 0 5.7% 0;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="100%" style="padding-left: 7.3%;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table width="23.5%" class="logo-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img width="417" height="170" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/apna-konnect-logo.png" alt="Apna Konnect" style="max-width: 100%; height: auto;">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="76.5%" class="line-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="100%" height="156" style="height: 8.125vw;max-height:156px;background: linear-gradient(to left, #479595, #CCD7B5 40%); border-radius: 127px 0 0 0;"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 8.5% 0 7.3%; margin-top: 6.5vw;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p class="title">${user.fname + user.lname}</p>
                                                        <div class="text">
                                                            <p>Thank you for registration</p>
                                                            <a href="#" target="_blank" title="Submit" class="btn" style="color: #ffffff;">Submit</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 7.3%; margin-top: 4vw;">
                                            <tbody>
                                                <tr>
                                                    <td style="position: relative;">
                                                        <p class="title2">Get in touch</p>
                                                        <span class="title-line"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 7.3%; margin-top: 4vw;">
                                            <tbody>
                                                <tr>
                                                    <td style="display: flex; align-items:flex-start;flex-wrap:wrap;">
                                                        <table width="40%" class="help-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p class="getin-text"><img width="41" height="41" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/call-icon.png" alt="Call" style="margin-right: 1vw; vertical-align: middle;width: 2.14vw;height: auto;">Help and Support</p>
                                                                        <a href="tel:1800145000" class="call-text" title="1800 145 000">1800 145 000</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="40%" class="mail-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p class="getin-text"><img width="43" height="43" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/chat-icon.png" alt="Chat" style="margin-right: 1vw;vertical-align: middle; width: 2.24vw; height: auto;">E-mail</p>
                                                                        <a href="mailto:apnaKonnect@gmail.com" class="mail-text" title="apnaKonnect@gmail.com">apnaKonnect@gmail.com</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="30%" class="site-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a href="www.apnakonnect.com" class="site-text" target="_blank" title="www.apnakonnect.com">www.apnakonnect.com</a>
                                                                        <table width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="social-icon">
                                                                                        <a href="#" target="_blank" title="Follow on Twitter"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/twitter-icon.png" alt="Twitter"></a>
                                                                                        <a href="#" target="_blank" title="Follow on Instagram"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/insta-icon.png" alt="Instagram"></a>
                                                                                        <a href="#" target="_blank" title="Follow on Facebook"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/fb-icon.png" alt="Facebook"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log("error", err)
                }
                else
                {
                    console.log("mail sent successfully");
                }
              });


            res.status(200).json({
              status: "success",
              message: "Register successfully",
              token: token,
              user: user,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              success: false,
              error: error,
            });
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong, internal server error",
      });
    }
  };

  const api_citizen_login = async(req, res) => {
    try {
        const { email, password } = JSON.parse(JSON.stringify(req.body));
        const user = await Citizen.findOne({email: email, password: password});

        if(!user) {
            res.status(404).json({
                status: "failed",
                message: "User doesn't exist",
              }); 
              return;
        }

        const token = jwt.sign({ userId: user._id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: "4320h",
          });

          const tokenSave = await Citizen.findOneAndUpdate(
            {
              _id: user._id,
            },
            { token: token }
          );

        res.status(200).json({
          status: "success",
          message: "Login successfully",
          token: token,
          user: user,
        });
    }
    catch(error) {
        console.log("error", error);
        res.send(error);
    }
  }


  const api_organization_registration = async (req, res) => {
    try {
    //   if (
    //     !req.body.hasOwnProperty("user_type") ||
    //     !req.body.hasOwnProperty("fname") ||
    //     !req.body.hasOwnProperty("lname") ||
    //     !req.body.hasOwnProperty("email") ||
    //     !req.body.hasOwnProperty("mobile") ||
    //     !req.body.hasOwnProperty("dob") ||
    //     !req.body.hasOwnProperty("gender") ||
    //     !req.body.hasOwnProperty("pincode") ||
    //     !req.body.hasOwnProperty("locality") ||
    //     !req.body.hasOwnProperty("city") ||
    //     !req.body.hasOwnProperty("state") ||
    //     !req.body.hasOwnProperty("country") ||
    //     !req.body.hasOwnProperty("check") ||
    //     !req.body.hasOwnProperty("otp") ||
    //     !req.body.hasOwnProperty("fcm_token")
    //   ) {
    //     res.status(400).json({
    //       success: false,
    //       error: "Bad Request, Parameters missing",
    //     });
    //     return;
    //   }
      const auser = await Organization.findOne({ $or: [
        { mobile: req.body.mobile },
        {email: req.body.email}
      ]});

      console.log(auser);
      
      if (auser) {
          res
          .status(400)
          .json({
            success: false,
            status: "failed",
            message: "user already exists",
            token: auser.token
          });
        return;
    } else {

        var newOrganization = new Organization({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password,
          location: req.body.location,
          category: req.body.category
        });
  
        newOrganization
          .save(newOrganization)
          .then(async (org) => {
            const userId = org._id.toString();
            const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, {
                expiresIn: "4320h",
              });
    
              const tokenSave = await Organization.findOneAndUpdate(
                {
                  _id: org._id,
                },
                { token: token }
              );


              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
              },
            });
    
            const mailOptions = {
                from: process.env.SMTP_MAIL, // sender address
                to: `${org.email}`, // list of receivers
                subject: "Message from CITY CARE", // Subject line
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title></title>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        table {
                            border: 0;
                            border-spacing: 0;
                        }
                        a {
                            text-decoration: none !important;
                        }
                        .main-mail-box {
                            font-family: 'Montserrat', sans-serif;
                            color: #090909;
                            font-size: 16px;
                        }
                        .logo-box {
                            width: 23.5%;
                        }
                        .line-box {
                            width:76.5%;
                            padding-left: 10%;
                        }
                        .title {
                            font-size: 2.7vw;
                            line-height: 1.22;
                            color: #265A75;
                            font-weight: bold;
                            font-family: 'Montserrat', sans-serif;
                            text-transform: capitalize;
                            margin: 0;
                        }
                        .text p {
                            font-size: 2.4vw;
                            line-height: 1.37;
                            color: #090909;
                            margin-bottom: 4.2vw;
                        }
                        .text p:last-child {
                            margin-bottom: 0;
                        }
                        .btn {
                            display: inline-block;
                            background: #215C7A;
                            border-radius: 100px;
                            text-align: center;
                            padding: 1.9vw 5.51vw;
                            font-size: 2.7vw;
                            line-height: 1.22;
                            color: #ffffff;
                            font-weight: bold;
                            text-decoration: none !important;
                        }
                        .title2 {
                            font-size: 4.113vw;
                            line-height: 1.216;
                            color: #265A75;
                            font-weight: bold;
                            font-family: 'Montserrat', sans-serif;
                            display: inline-block;
                            padding-right: 1.4vw;
                            background: #ffffff;
                            margin: 0;
                            position: relative;
                            z-index: 1;
                        }
                        .title-line {
                            display: inline-block;
                            width: 100%;
                            height: 5.3%;
                            background: #265A75;
                            position: absolute;
                            bottom: 28%;
                            left: 0;
                        }
                        .help-box {
                            width:30%; 
                            padding-right: 3.1%; 
                            padding-bottom: 30px;
                        }
                        .mail-box {
                            width:40%; 
                            padding: 0 3% 30px 3%; 
                            border-left: 3px solid #707070; 
                            border-right: 3px solid #707070;
                        }
                        .site-box {
                            width:30%;
                            padding-left: 2.5%;
                            padding-bottom: 30px;
                        }
                        .getin-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            color: #090909;
                            margin-bottom: 14px;
                        }
                        .call-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            font-weight: bold;
                            color: #090909;
                            font-family: 'Roboto', sans-serif;
                        }
                        .mail-text {
                            font-size: 2.134vw;
                            line-height: 1.23;
                            font-weight: bold;
                            color: #265A75;
                            font-family: 'Roboto', sans-serif;
                        }
                        .site-text {
                            font-size: 2.134vw;
                            line-height: 1.2;
                            color: #090909;
                            font-family: 'Roboto', sans-serif;
                        }
                        .social-icon {
                            display: inline-block;
                            margin-top: 1vw;
                        }
                        .social-icon a {
                            display: inline-block;
                            margin-right: 15px;
                        }
                        .social-icon a img {
                            width: 2.66vw;
                            height: auto;
                        }
                        @media screen and (max-width: 767px) {
                            .logo-box {
                                width: 40%;
                            }
                            .line-box {
                                width: 60%;
                                padding-left: 10%;
                            }
                            .title {
                                font-size: 20px;
                                line-height: 35px;
                            }
                            .text p {
                                font-size: 14px;
                                line-height: 24px;
                            }
                            .btn {
                                padding: 5px 20px;
                                font-size: 14px;
                                line-height: 24px;
                            }
                            .title2 {
                                font-size: 22px;
                                line-height: 32px;
                                padding-right: 20px;
                            }
                            .help-box {
                                width: 100%; 
                                padding-right: 0; 
                                padding-bottom: 10px;
                            }
                            .mail-box {
                                width:100%; 
                                padding: 10px 0;
                                border-left: 0; 
                                border-right: 0;
                                border-top: 1px solid #707070; 
                                border-bottom: 1px solid #707070;
                            }
                            .site-box {
                                width:100%;
                                padding-left: 0;
                                padding-bottom: 0;
                                padding-top: 10px;
                            }
                            .social-icon a {
                                margin-right: 10px;
                            }
                            .social-icon a img {
                                width: 30px;
                                height: auto;
                            }
                            .getin-text {
                                font-size: 16px;
                                line-height: 26px;
                                margin-bottom: 5px;
                            }
                            .getin-text img {
                                width: 14px !important;
                                height: auto !important;
                                margin-right: 10px !important;
                            }
                            .call-text,
                            .mail-text {
                                font-size: 18px;
                                line-height: 28px;
                            }
                            .site-text {
                                font-size: 16px;
                                line-height: 26px;
                            }
                            .social-icon {
                                margin-top: 15px;
                            }
                        }
                    </style>
                    <!--[if !mso]>-->
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
                    <!--<![endif]-->
                </head>
                
                <body>
                    <div class="main-mail-box">
                        <table width="100%" style="padding: 7% 0 5.7% 0;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="100%" style="padding-left: 7.3%;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table width="23.5%" class="logo-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img width="417" height="170" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/apna-konnect-logo.png" alt="Apna Konnect" style="max-width: 100%; height: auto;">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="76.5%" class="line-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="100%" height="156" style="height: 8.125vw;max-height:156px;background: linear-gradient(to left, #479595, #CCD7B5 40%); border-radius: 127px 0 0 0;"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 8.5% 0 7.3%; margin-top: 6.5vw;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p class="title">${org.name}</p>
                                                        <div class="text">
                                                            <p>Thank you for registration</p>
                                                            <a href="#" target="_blank" title="Submit" class="btn" style="color: #ffffff;">Submit</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 7.3%; margin-top: 4vw;">
                                            <tbody>
                                                <tr>
                                                    <td style="position: relative;">
                                                        <p class="title2">Get in touch</p>
                                                        <span class="title-line"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="100%" style="padding: 0 7.3%; margin-top: 4vw;">
                                            <tbody>
                                                <tr>
                                                    <td style="display: flex; align-items:flex-start;flex-wrap:wrap;">
                                                        <table width="40%" class="help-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p class="getin-text"><img width="41" height="41" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/call-icon.png" alt="Call" style="margin-right: 1vw; vertical-align: middle;width: 2.14vw;height: auto;">Help and Support</p>
                                                                        <a href="tel:1800145000" class="call-text" title="1800 145 000">1800 145 000</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="40%" class="mail-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p class="getin-text"><img width="43" height="43" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/chat-icon.png" alt="Chat" style="margin-right: 1vw;vertical-align: middle; width: 2.24vw; height: auto;">E-mail</p>
                                                                        <a href="mailto:apnaKonnect@gmail.com" class="mail-text" title="apnaKonnect@gmail.com">apnaKonnect@gmail.com</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="30%" class="site-box" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a href="www.apnakonnect.com" class="site-text" target="_blank" title="www.apnakonnect.com">www.apnakonnect.com</a>
                                                                        <table width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="social-icon">
                                                                                        <a href="#" target="_blank" title="Follow on Twitter"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/twitter-icon.png" alt="Twitter"></a>
                                                                                        <a href="#" target="_blank" title="Follow on Instagram"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/insta-icon.png" alt="Instagram"></a>
                                                                                        <a href="#" target="_blank" title="Follow on Facebook"><img width="51" height="51" src="http://html.geekwebsolution.com/Rakesh-Sir/Apna-Konnect/fb-icon.png" alt="Facebook"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log("error", err)
                }
                else
                {
                    console.log("mail sent successfully");
                }
              });


            res.status(200).json({
              status: "success",
              message: "Register successfully",
              token: token,
              organization: newOrganization,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              success: false,
              error: error,
            });
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong, internal server error",
      });
    }
  };

  const api_organization_login = async(req, res) => {
    try {
        const { email, password, type, mobile } = req.body;

        if(type=="email")
        {
            var org = await Organization.findOne({email: email, password: password});
        }
        else
        {
            var org = await Organization.findOne({mobile: mobile, password: password});
        }

        if(!org) {
            res.json({
                status: "failed",
                message: "Organization doesn't exist",
              }); 
              return;
        }

        const token = jwt.sign({ userId: org._id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: "4320h",
          });

          const tokenSave = await Organization.findOneAndUpdate(
            {
              _id: org._id,
            },
            { token: token }
          );

        res.json({
          status: "success",
          message: "Login successfully",
          token: token,
          Organization: org,
        });
    }
    catch(error) {
        console.log("error", error);
        res.send(error);
    }
  }



module.exports = {
    api_send_otp,
    api_verify_otp,
    api_citizen_registration,
    api_citizen_login,
    api_organization_registration,
    api_organization_login
}