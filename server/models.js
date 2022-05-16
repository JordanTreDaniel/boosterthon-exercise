import mongoose from "mongoose";
import { validateEmail } from "./helpers.js";
const ReviewSchema = new mongoose.Schema({
  fundraiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fundraiser",
    required: true,
  },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviewer",
    required: true,
  },
});

const ReviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

const FundraiserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Review = mongoose.model("Review", ReviewSchema);
export const Reviewer = mongoose.model("Reviewer", ReviewerSchema);
export const Fundraiser = mongoose.model("Fundraiser", FundraiserSchema);
