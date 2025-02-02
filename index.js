const dotenv=require('dotenv');
const express=require('express');
const {connectDB}=require('./config/db')
const {router} =require('./routes/faqRoutes.js');
const { adminRouter,adminJs } = require('./admin/admin.js');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/faqs', router);
app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS at http://localhost:${PORT}${adminJs.options.rootPath}`);
});

module.exports={app};