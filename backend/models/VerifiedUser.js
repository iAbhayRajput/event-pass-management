const mongoose = require("mongoose");

// Counter collection for auto-increment
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 50000 }, // Start from 50000
});

const Counter = mongoose.model("Counter", counterSchema);

// Verified User Schema
const verifiedUserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  numberOfPasses: { type: Number, required: true },
  uniqueCode: { type: Number, unique: true }, // Auto-incremented
  amount: { type: Number, required: true }, // Multiple of 1000
  purchaseDate: { type: Date, required: true },
  idProofImage: { type: String, required: true }, // Base64 Image
  uploadDate: { type: Date, required: true },
  isUsed1: { type: Boolean, default: false },
  isUsed2: { type: Boolean, default: false },
  isAlreadyPaid: { type: Boolean, default: true },
  uuid: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(1000000 + Math.random() * 9000000).toString(),
  },
});

// Pre-save hook to auto-increment `uniqueCode`
verifiedUserSchema.pre("save", async function (next) {
  if (!this.uniqueCode) {
    const counter = await Counter.findOneAndUpdate(
      { name: "uniqueCode" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.uniqueCode = counter.seq;
  }
  next();
});

const VerifiedUser = mongoose.model("VerifiedUser", verifiedUserSchema);
module.exports = VerifiedUser;
