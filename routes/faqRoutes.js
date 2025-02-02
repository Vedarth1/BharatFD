const express = require('express');
const { getFaqs, createFaq } = require('../controllers/faqController.js');

const router = express.Router();

router.get('/', getFaqs);
router.post('/', createFaq);

module.exports= { router };