const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(express.json());
app.use(cors());

const nodemailer = require("nodemailer");
const OrgModel = require("./Models/organization");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/sendemail", (req, res) => {
  const { email, subject, message } = req.body;
  console.log(email, subject, message);
  res.json("success");

  const mailData = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});


app.post("/register", (req, res) => {
  OrgModel.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.log(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  OrgModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("incorrect password");
      }
    } else {
      res.json("No record existed");
    }
  });
});



app.listen(port, () => {
  console.log(`Notes_App listening on port ${port}`);
});

const connectToMongo = require("./Database/db");
connectToMongo();
