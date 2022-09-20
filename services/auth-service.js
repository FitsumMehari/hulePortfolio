const User = require('../models/user')
const md5 = require("md5")
const jwt = require("jsonwebtoken")

const getUserByEmailAndPassword = async function (email, password) {
    const pass = password;
    try {

        // Find user from DB
        const user = await User.findOne({ email: email });

        // Check if user exists
        if (!user) return ({ message: "Wrong Credientials" });

        // Hash the input password
        const hashedPassword = md5(pass);

        // Check if passwords match
        if (user.password !== hashedPassword) return ({ message: "Wrong Credientials!" });

        // Sign the access token
        const accessToken = jwt.sign({
            id: user._id,
            password: user.password
        }, process.env.JWTKEY, { expiresIn: '3d' })

        // Extract the password from the response data
        const { password, ...others } = user._doc;

        // Send the data
        return ({ message: "Log In Successful!", others, accessToken });
    } catch (error) {
        return error
    }
}


const addUserByEmailAndPassword = async function (email, password) {
    const pass = password;
    try {

        // Find user from DB
        const user = await User.findOne({ email: email });

        // Check if user exists
        if (user) return ({ message: "Email not available" });

        // Hash the input password
        const hashedPassword = md5(pass);

        //  Create the new user
        const newUser = new User({
            email: email,
            password: hashedPassword
        })

        try {
            //  Save the new user
            const savedUser = await newUser.save();

            // Extract the password from the response data
            const { password, ...others } = savedUser._doc;
            // Send the data
            return ({ message: "Sign Up Successful!", others });
        } catch (error) {
            return error
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    getUserByEmailAndPassword,
    addUserByEmailAndPassword,
}