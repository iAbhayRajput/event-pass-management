require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifiedUsersRoutes = require("./routes/verifiedUsers"); // ✅ Correct Import

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", qrRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verifiedusers", verifiedUsersRoutes); // ✅ Route for verified users

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/qr-pass-system";
mongoose
  .connect(MONGO_URI, { dbName: "qr-pass-system" }) // ✅ Force database name
  .then(() => {
      console.log("✅ MongoDB Connected to:", mongoose.connection.db.databaseName);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  
  
  const VerifiedUsers = require("./models/VerifiedUser");
  
 // mongoose.connection.once("open", async () => {
   // console.log("📌 Stored UUIDs in Database:");
   // const users = await VerifiedUsers.find({}, "uuid userName");
   // users.forEach(user => console.log(`👤 ${user.userName}: ${user.uuid}`));
 // });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
