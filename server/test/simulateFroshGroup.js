const mongoose = require('mongoose');
const FroshServices = require('../src/services/FroshServices');
require('dotenv').config();
const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DBNAME}?authSource=admin`;

async function main() {
//   Connect to your local/test MongoDB
  await mongoose.connect(mongoURI);

//   let discipline = 'Electrical & Computer';
//   let discipline = 'Mechanical'; 
//   let discipline = 'Chemical';
//   let discipline = 'Civil'; 
//   let discipline = 'Industrial'; 
//   let discipline = 'Engineering Science'; 
//   let discipline = 'Mineral'; 
  let discipline = 'Track One (Undeclared)'; 
//   let discipline = 'Materials'; 


//   let pronouns = 'She/Her';
  let pronouns = 'He/Him';
//   let pronouns = 'They/Them';
//   let pronouns = 'Prefer Not to Say';
//   let pronouns = 'Other';
  

//   Call the function
  const result = await FroshServices.getNewFroshGroup(discipline, pronouns);

  console.log('Best frosh group:', result);

//   Disconnect when done
  await mongoose.disconnect();
}

main().catch(console.error);
