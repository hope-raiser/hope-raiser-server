const prisma = require("../helpers/prisma.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  static registerUser = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      res
        .status(200)
        .json({ message: "User Registered Successfully", data: user });
    } catch (err) {
      next({ name: "UsersAlreadyExist" });
    }
  };

  static loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.users.findUnique({ where: { email } });

      if (!user) {
        return next({ name: "WrongPassword" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return next({ name: "WrongPassword" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      return res
        .status(200)
        .json({ token, email, name: user.name, id: user.id });
    } catch (err) {
      next(err);
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const users = await prisma.users.findMany();
      res
        .status(200)
        .json({ message: "Users retrieved successfully", data: users });
    } catch (err) {
      next(err);
    }
  };

  static ChangePassword = async (req, res, next) => {
    try {
      const { userId, oldPassword, newPassword } = req.body;

      // Get the user from the database
      const user = await prisma.users.findUnique({ where: { id: userId } });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the old password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      res
        .status(200)
        .json({ message: "Password changed successfully", data: updatedUser });
    } catch (err) {
      next(err);
    }
  };

  static changePassword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.users.update({
        where: { id: +id },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(200).json({ message: "Successfully Change Password" });
    } catch (err) {
      next(err);
      return res.status(400).json({ message: "Failed Change Password" });
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findUser = await prisma.users.findUnique({ where: { id: +id } });
      if (findUser) {
        const user = await prisma.users.delete({
          where: { id: +id },
        });
        if (user) {
          res.status(200).json({
            message: "User deleted successfully",
          });
        }
      } else {
        next({ name: "ErrorNotFound" });
      }
    } catch (err) {
      res.status(400).json({ message: "Failed Delete User" });
    }
  };

  static changeName = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedUser = await prisma.users.update({
        where: { id: +id },
        data: {
          name: name,
        },
      });
      return res
        .status(200)
        .json({ message: "Successfully changed name", data: updatedUser });
    } catch (err) {
      next(err);
      return res.status(400).json({ message: "Failed to change name" });
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, password } = req.body;

      // Update the user's name and/or password in the database
      const updatedFields = {};

      if (name) {
        updatedFields.name = name;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.password = hashedPassword;
      }

      const updatedUser = await prisma.users.update({
        where: { id: +id },
        data: updatedFields,
      });

      return res.status(200).json({
        message: "Successfully updated user",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
      return res.status(400).json({ message: "Failed to update user" });
    }
  };

  static updateUserProfile = async (req, res, next) => {
    try {
      const { id, name, password } = req.body;

      // Update the user's name and/or password in the database
      const updatedFields = {};

      if (name) {
        updatedFields.name = name;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.password = hashedPassword;
      }

      const updatedUser = await prisma.users.update({
        where: { id: +id },
        data: updatedFields,
      });

      return res.status(200).json({
        message: "Successfully updated user",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
      return res.status(400).json({ message: "Failed to update user" });
    }
  };
}

module.exports = UserController;
