const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    throw new Error("Error hashing password");
  }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const verified = jwt.verify(token, `${process.env.SEC_KEY}`);
    if (!verified) return res.status(401).json("Invalid token");
    req.user = verified;
    next();
  } catch (e) {
    res.status(401).json("Cookie not found!");
  }
};

const adminAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Invalid token");
  const verified = jwt.verify(token, `${process.env.SEC_KEY}`);
  if (!verified) return res.status(401).json("Token expired");
  req.user = verified;
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json("Protected route");
  }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (e) {
    throw new Error("Error hashing password");
  }
};

module.exports = { hashPassword, comparePasswords, authenticate, adminAuth };
