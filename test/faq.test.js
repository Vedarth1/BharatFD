import { expect } from 'chai';
import request from 'supertest';
import {app} from '../index.js';
import { Faq } from '../models/faqModel.js';


describe('FAQ API', function () {
  this.timeout(10000);
  beforeEach(async () => {
    await Faq.deleteMany({});
  });

  it('should create an FAQ with translations', async () => {
    const res = await request(app)
      .post('/api/faqs')
      .send({ question: 'Hello', answer: 'World' });
    
    expect(res.status).to.equal(201);
    expect(res.body.question.hi).to.exist;
  });

  it('should retrieve FAQs in Hindi', async () => {
    await Faq.create({
      question: { en: 'Hello', hi: 'नमस्ते' },
      answer: { en: 'World', hi: 'दुनिया' }
    });

    const res = await request(app).get('/api/faqs?lang=hi');
    expect(res.body[0].question).to.equal('नमस्ते');
  });
});