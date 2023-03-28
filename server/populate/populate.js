/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const malenames = require("./malenames.json");
const femalenames = require("./femalenames.json");
const hobbies = require("./hobbies.json");
const UserModel = require("../db/user.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const createRandomNumber = (min, max) => {
  return Math.floor(Math.random()*(max-min+1)+min)
};

const populateUsers = async () => {
  await UserModel.deleteMany({});

  const males = malenames.map((name) => ({
    name,
    gender: "male",
    age: createRandomNumber(20, 45),
    hobbies: [...Array(3)].map(() => pick(hobbies)),
  }));
  
  const females = femalenames.map((name) => ({
    name,
    gender: "female",
    age: createRandomNumber(20, 35),
    hobbies: [...Array(3)].map(() => pick(hobbies)),
  }));

  await UserModel.create(...males);
  await UserModel.create(...females);

  console.log("Users created");
};

const main = async () => {
  await mongoose.connect(mongoUrl, {family:4});

  await populateUsers();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
