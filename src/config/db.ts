import { DB_URL } from './index';
import mongoose from 'mongoose';


const connectDB = async (): Promise<void> => {
    try {
      const conn = await mongoose.connect(DB_URL as string);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error:any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  

export default connectDB;
