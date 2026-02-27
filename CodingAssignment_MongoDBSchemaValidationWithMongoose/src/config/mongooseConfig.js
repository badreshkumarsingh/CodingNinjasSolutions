// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';

export const connectUsingMongoose = async () => {
  // write your code here
  const url = 'mongodb://localhost:27017'
  try{
    await mongoose.connect(url);
    console.log('MongoDB connected using mongoose');
  } catch (err) {
    console.log(err);
  }

};
