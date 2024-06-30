const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.json({ message: "User registered successfully", user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, "surya@9182");
                    res.cookie('token', token);
                    return res.json({ message: "Login successful", role: user.role, name: user.name });
                } else {
                    return res.status(401).json({ error: "Incorrect Password" });
                }
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout successful" });
};

module.exports={signup,login,logout}
