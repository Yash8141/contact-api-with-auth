import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    type: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
  }
);

export const Contact = mongoose.model("Contact", contactSchema);
