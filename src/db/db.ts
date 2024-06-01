import mongoose from 'mongoose';
import env from '../env';

const { MONGO_INITDB_DATABASE } = env;

const mongoUri =`mongodb://db:27017/${MONGO_INITDB_DATABASE}`

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
