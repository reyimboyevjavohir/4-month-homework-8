const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hash,
        role
    });

    res.json(user);
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User yo'q" });

    const check = await bcrypt.compare(password, user.password);
    if (!check) return res.status(400).json({ message: "Parol xato" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
};
