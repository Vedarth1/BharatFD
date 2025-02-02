const { Faq } = require('../models/faqModel.js');
const { redisClient } = require('../config/redis.js');
const { translator } = require('../services/translation.js');

const invalidateCache = async () => {
  const cacheKeys = await redisClient.keys('faqs:*');
  if (cacheKeys.length) await redisClient.del(cacheKeys);
};

const getFaqs = async (req, res) => {
  const lang = req.query.lang || 'en';
  const cacheKey = `faqs:${lang}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const faqs = await Faq.find().lean();
    const processed = faqs.map(faq => ({
      ...faq,
      question: faq.question[lang] || faq.question.en,
      answer: faq.answer[lang] || faq.answer.en
    }));

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(processed));
    res.json(processed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const translations = {};

    for (const lang of ['hi', 'bn']) {
      translations[lang] = {
        question: await translator(question, lang),
        answer: await translator(answer, lang)
      };
    }
    const faq = await Faq.create({
        question: { 
          en: question, 
          hi: translations.hi?.question || '', 
          bn: translations.bn?.question || '' 
        },
        answer: { 
          en: answer, 
          hi: translations.hi?.answer || '', 
          bn: translations.bn?.answer || '' 
        }
      });

    await invalidateCache();
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports= { getFaqs, createFaq };
