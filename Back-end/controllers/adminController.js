import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ username } );

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create admin
  const admin = await Admin.create({
    username,
    password: hashedPassword,
  });
  //checking if admin is created
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Check for admin email
  const admin = await Admin.findOne({username});
  //if admin and password are correct return the admin data
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const getAdmin = asyncHandler(async (req, res) => {
    res.status(200).json(req.admin)
}
)

// Generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
