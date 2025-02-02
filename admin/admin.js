import AdminJS from 'adminjs' ;
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

import { Faq } from '../models/faqModel.js';
import { translator } from '../services/translation.js';


AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [{
    resource: Faq,
    options: {
      properties: {
        'question.en': { type: 'string', isVisible: true },
        'question.hi': { type: 'string', isVisible: false }, 
        'question.bn': { type: 'string', isVisible: false }, 
        'answer.en': { type: 'richtext', isVisible: true },
        'answer.hi': { type: 'richtext', isVisible: false }, 
        'answer.bn': { type: 'richtext', isVisible: false },
      },
      actions: {
        new: {
          before: async (request) => {
            const { payload } = request;
            const questionEn = payload['question.en'];
            const answerEn = payload['answer.en'];
            payload.question = {
              en: questionEn,
              hi: await translator(questionEn, 'hi'),
              bn: await translator(questionEn, 'bn'),
            };

            payload.answer = {
              en: answerEn,
              hi: await translator(answerEn, 'hi'),
              bn: await translator(answerEn, 'bn'),
            };

            return request;
          },
        },
        edit: {
          before: async (request) => {
            const { payload } = request;
            const questionEn = payload['question.en'];
            const answerEn = payload['answer.en'];
            if (questionEn) {
              payload.question = {
                en: questionEn,
                hi: await translator(questionEn, 'hi'),
                bn: await translator(questionEn, 'bn'),
              };
            }
            if (answerEn) {
              payload.answer = {
                en: answerEn,
                hi: await translator(answerEn, 'hi'),
                bn: await translator(answerEn, 'bn'),
              };
            }

            return request;
          },
        },
        delete: {
          label: 'Delete FAQ',
          icon: 'Trash',
          isVisible: true,
        },
      },
      listProperties: ['question.en', 'answer.en', 'createdAt'], 
      editProperties: ['question.en', 'answer.en'],
      showProperties: ['question.en', 'question.hi', 'question.bn', 'answer.en', 'answer.hi', 'answer.bn', 'createdAt', 'updatedAt'],
    }
  }],
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === 'admin' && password === 'admin') return { email: 'admin' };
    return null;
  },
  cookiePassword: process.env.ADMINJS_COOKIE_SECRET
});

export  { adminRouter, adminJs };