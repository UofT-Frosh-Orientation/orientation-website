const mongoose = require('mongoose');
const FroshServices = require('./services/FroshServices');
require('dotenv').config();
const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DBNAME}?authSource=admin`;

async function main() {
  // Connect to your local/test MongoDB
  await mongoose.connect(mongoURI);

  // Example disciplines and pronouns
  const discipline = 'Electrical & Computer';
  const pronouns = 'She/Her';

  // Call the function
  const result = await FroshServices.getNewFroshGroup(discipline, pronouns);

  console.log('Best frosh group:', result);

  // Disconnect when done
  await mongoose.disconnect();
}

main().catch(console.error);
