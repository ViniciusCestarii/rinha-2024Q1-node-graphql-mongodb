import mongoose from 'mongoose';

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE  } = process.env;

if (!MONGO_INITDB_ROOT_USERNAME) {
  throw new Error('Please define the MONGO_INITDB_ROOT_USERNAME environment variable inside .env');
}
if (!MONGO_INITDB_ROOT_PASSWORD) {
  throw new Error('Please define the MONGO_INITDB_ROOT_PASSWORD environment variable inside .env');
}
if (!MONGO_INITDB_DATABASE) {
  throw new Error('Please define the MONGO_INITDB_DATABASE environment variable inside .env');
}

const mongoUri =`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@db:27017/${MONGO_INITDB_DATABASE}`

console.log('Connecting to MongoDB:', mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default mongoose;
