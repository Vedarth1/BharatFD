const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected Successfully!');
    } catch (error) {
      console.error('MongoDB error:', error);
    }
};

module.exports={connectDB};