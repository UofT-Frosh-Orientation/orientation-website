const mongoose = require("mongoose");

const loadMongo = async () => {
  console.log("Loading mongo...");
  const {MONGODB_PASSWORD, MONGODB_HOST, MONGODB_USER} = process.env;
  const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${process.env.NODE_ENV === "production" ? MONGODB_HOST: "mongo-dev"}:27017/?authSource=admin`;
  console.log(mongoURI);
  await mongoose.connect(mongoURI);
  console.log("Connected to mongo!")
}

module.exports = loadMongo;
