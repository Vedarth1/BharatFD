import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import {router as faqRouter} from './routes/faqRoutes.js'
import { adminRouter,adminJs } from './admin/admin.js';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();


app.use('/api/faqs', faqRouter);
app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS at http://localhost:${PORT}${adminJs.options.rootPath}`);
});

export{app};