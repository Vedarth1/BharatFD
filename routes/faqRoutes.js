import express from 'express';
import { getFaqs, createFaq } from '../controllers/faqController.js';

const router = express.Router();

router.get('/', getFaqs);
router.post('/', createFaq);

export { router };
