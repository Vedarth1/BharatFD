import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    en: { type: String, required: true },
    hi: String,
    bn: String
  },
  answer: {
    en: { type: String, required: true },
    hi: String,
    bn: String
  }
}, { timestamps: true });

export const Faq = mongoose.model("Faq", faqSchema);