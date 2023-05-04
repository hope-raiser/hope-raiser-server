const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {

    static registerUser = async (req, res, next) => {

        try {
            const { name, email, password, role } = req.body;
            const data = await User.registerUser(
                name, email, password, role, next);
            res.status(200).json({
                message: "User Registered Successfully"
            })
        } catch (err) {
            next(err);
        }
    }

    static loginUser = async (req, res, next) => {

        try {
            const { email, password } = req.body;
            const data = await User.loginUser(email, password, next);
            if (!data) {
                return next({ name: "WrongPassword" });
            }
            const passwordMatch = await bcrypt.compare(password, data.password);
            if (!passwordMatch) {
                return next({ name: "WrongPassword" });
            }
            const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET);
            return res.status(200).json({ token });
        } catch (err) {
            next(err);
            res.status(400).json({ message: "Invalid credentials" });
        }
    }
    
    static changePassword = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {password} = req.body;

            const data = await User.changePassword(id, password, next);
            return res.status(200).json({message: "Successfully Change Password"});
        } catch (err) {
            next(err);
            return res.status(400).json({ message: "Fail" });
        }
    }

    static deleteUser = async (req, res, next) => {
        try {
            const {id} = req.params;
            const data = await User.deleteUser(id, next);
            if(data) {
                res.status(200).json({
                    message: "User deleted successfully"
                })
            }
        } catch (err) {
            res.status(400).json({ message: "Fail Delete" });
        }
    }

}
module.exports = UserController; 