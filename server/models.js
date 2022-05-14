import mongoose from "mongoose";

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

// const validateEmail = function (email) {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const ReviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const FundraiserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Review = mongoose.model("Review", ReviewSchema);
export const Reviewer = mongoose.model("Reviewer", ReviewerSchema);
export const Fundraiser = mongoose.model("Fundraiser", FundraiserSchema);
