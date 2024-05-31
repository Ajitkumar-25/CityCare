var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
var Organization = require("../models/organization");

// user login check
// Bearer
router.use(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("token:   ", token)

        await jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userId = user.userId;
            const userObj = await Organization.findOne({ _id: user.userId });
            if (!userObj) {
                return res.sendStatus(403);
            }
            console.log('userdata', user);
            next();
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;