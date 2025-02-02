const dotenv=require('dotenv');
const express=require('express');
const {connectDB}=require('./config/db')
const {router} =require('./routes/faqRoutes.js');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/faqs', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports={app};