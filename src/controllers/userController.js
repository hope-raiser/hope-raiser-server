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
					role
				}
			});
			res.status(200).json({ message: "User Registered Successfully", data: user });
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
			const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
			return res.status(200).json({ token });
		} catch (err) {
			next(err);
			res.status(401).json({ message: "Invalid credentials" });
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
					password: hashedPassword
				}
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
					where: { id: +id }
				});
				if (user) {
					res.status(200).json({
						message: "User deleted successfully"
					});
				}
			} else {
				next({ name: "ErrorNotFound" });
			}
		} catch (err) {
			res.status(400).json({ message: "Failed Delete User" });
		}
	};
}
module.exports = UserController;
