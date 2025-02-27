require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import Routes
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifiedUsersRoutes = require("./routes/verifiedUsers");

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  "https://prisma-user-management.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // ✅ Allow cookies & authentication headers if needed
  })
);

app.use(bodyParser.json());

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api", qrRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verifiedusers", verifiedUsersRoutes);
app.use("/api/email", emailRoutes); // ✅ Ensure Email Route is Active

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { dbName: "qr-pass-system" })
  .then(() => console.log("✅ MongoDB Connected:", mongoose.connection.db.databaseName))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Authentication Setup
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const users = [
  { username: "admin", password: bcrypt.hashSync("Admin@123", 10) },
  { username: "user1", password: bcrypt.hashSync("User1@pass", 10) },
  { username: "user2", password: bcrypt.hashSync("User2#pafZ", 10) },
  { username: "user3", password: bcrypt.hashSync("User3$scBs", 10) },
  { username: "user4", password: bcrypt.hashSync("User4*NvxJ", 10) },
];

// ✅ Middleware to Check JWT Token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// ✅ Login Route (JWT Token Issuance)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "12h" });
  res.json({ token });
});

// ✅ Protected Route Example
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! You accessed a protected route.` });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
