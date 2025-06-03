const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Vishal"

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword, role });
  console.log('role'+role)
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if (!user || !(await bcrypt.compare(password, user.password)))
  // return res.status(401).json({ message: "Invalid credentials" });
  
  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }
  const pwd = await bcrypt.compare(password, user.password);
  if (!pwd) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({ token });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
