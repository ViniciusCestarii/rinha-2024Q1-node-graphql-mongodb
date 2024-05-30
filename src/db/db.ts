import mongoose from 'mongoose';
import env from '../env';

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE } = env;

const mongoUri =`mongodb+srv://viniciuscestari01:7KwbMnHPAKfU6Spl@rinha-2024-q1-developme.npgoidx.mongodb.net/`

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
