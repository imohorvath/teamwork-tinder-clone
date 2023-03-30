/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const femaleFirstNames = require("./femalefirstnames.json");
const maleFirstNames = require("./malefirstnames.json");
const surNames = require("./surnames.json");
const hobbies = require("./hobbies.json");
const UserModel = require("../db/user.model");
const femaleImages = require("./femaleimages.json");
const maleImages = require("./maleimages.json");
const femaleIntroductions = require("./femaleintroductions.json");
const maleIntroductions  = require("./maleintroductions.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

const populateUsers = async () => {
  await UserModel.deleteMany({});

  const males = maleFirstNames.map((name, index) => ({
    username: `${name.toLowerCase()}${index + 100}`,
    name: `${name} ${pick(surNames)}`,
    gender: "male",
    age: createRandomNumber(25, 45),
    hobbies: [...Array(3)].map(() => pick(hobbies)),
    introduction: maleIntroductions[index],
    image: maleImages[index]
  }));

  const females = femaleFirstNames.map((name, index) => ({
    username: `${name.toLowerCase()}${index + 100}`,
    name: `${name} ${pick(surNames)}`,
    gender: "female",
    age: createRandomNumber(25, 45),
    hobbies: [...Array(3)].map(() => pick(hobbies)),
    introduction: femaleIntroductions[index],
    image: femaleImages[index]
  }));

  await UserModel.create(...males);
  await UserModel.create(...females);

  console.log("Users created");
};

const updateLikesAndRejects = async () => {
  const allUsers = await UserModel.find();

  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const otherUsers = allUsers.filter(user => user.id !== currentUser.id && user.gender !== currentUser.gender);

    const liked = [];
    const rejected = [];

    [...Array(15)].map(() => {
      const randomUser = pick(otherUsers);
      if (!liked.includes(randomUser.id) && !rejected.includes(randomUser.id) && randomUser.id !== currentUser.id) {
        liked.push(randomUser.id);
      }
    }
    );

    [...Array(3)].map(() => {
      const randomUser = pick(otherUsers);
      if (!liked.includes(randomUser.id) && !rejected.includes(randomUser.id) && randomUser.id !== currentUser.id) {
        rejected.push(randomUser.id);
      }
    }
    )

    currentUser.liked = liked;
    currentUser.rejected = rejected;
    await currentUser.save();
  }

  console.log("Likes and rejecteds updated!");
}

const main = async () => {
  await mongoose.connect(mongoUrl, { family: 4 });

  // await populateUsers();

  await updateLikesAndRejects();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
