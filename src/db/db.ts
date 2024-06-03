import mongoose from 'mongoose';
import env from '../env';

const { ME_CONFIG_MONGODB_URL } = env;

const mongoUri = ME_CONFIG_MONGODB_URL

export const connectDb = () => {
console.log('Connecting to MongoDB:', mongoUri);

mongoose
  .connect(mongoUri)
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  mongoose.connection.once('open', () => {
    console.log('Connected to the database');
  });
}
