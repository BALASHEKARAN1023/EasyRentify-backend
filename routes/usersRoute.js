const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const { error } = require("console");

router.post("/login", async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ userName: username })
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!user) {

            return res.status(400).json("User not found!");

        }

        if (!isPassword) {

            return res.status(400).json("Invaild Password!");
        }
        let token = jwt.sign({ userName: user.userName, role: user.role }, "jwt-secret-Key");
        const { password, role, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ details: { ...otherDetails }, role });

    } catch (error) {
        return res.status(400).json(error)
    }
});

router.post("/register", async (req, res) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const UserData = new User({
            ...req.body,
            password: hash,

        });
        await UserData.save();
        res.send('User Register SuccesFully');

    } catch (error) {
        return res.status(400).json(error)
    }
});


module.exports = router;
