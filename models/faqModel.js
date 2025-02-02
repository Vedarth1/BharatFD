const mongoose = require("mongoose");

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

const Faq = mongoose.model('Faq', faqSchema);
module.exports = { Faq };