const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(express.json());
app.use(cors());
const OrgModel = require("./Models/organization");

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
