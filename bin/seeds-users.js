/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const User = require('../models/user-model');
require("dotenv").config(); // To connect to the database


/**
 * MIDDLEWARE CONFIGURATION
**/
// Database connection
mongoose.connect(process.env.MONGODB_URI); // Databse name from local .env
const bcryptSalt = 10;

// Encrypt password
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(process.env.MONGODB_DEFAULT_PWD, salt);


/**
 * USERS DATA
**/
const users = [
  {
    email: 'irene@ironhack.com',
    password: hashPass,
    gender: 'Female',
    firstName: 'Irene',
    lastName: 'de Mas',
    nationality: ['Spain'],
    city: 'Barcelona',
    phone: 645499586,
    bio: 'I am the program manager at Ironhack Barcelona',
    pictureUrl: 'https://secure.meetupstatic.com/photos/member/c/e/4/9/highres_266212809.jpeg',
    socialNetworks: {
      skype: 'irene@ironhack.com',
      slack: '@irenedemas',
      twitter: '@palento'
    },
    role: 'ADMIN',
  },
  {
    email: 'denis.barriere@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Denis',
    lastName: 'Denis',
    dateOfBirth: new Date("1981-10-10"),
    nationality: ['France', 'Australia'],
    address: 'Carrer de Vallirana, 40',
    postCode: '08006',
    city: 'Barcelona',
    phone: 684116853,
    bio: 'I am a Scrum Master, former Technical Business Analyst/Tester and Software Developer',
    socialNetworks: {
      Facebook: 'https://www.facebook.com/denis.barriere',
      Instagram: 'https://www.instagram.com/the_aussie_shot/',
      skype: 'denis.barriere',
      slack: '@denis.barriere',
    },
    role: 'USER',
    studentId: '598351360920f7b1a274e536',
  },
  {
    email: 'jb.tellez@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'JB',
    lastName: 'Tellez',
    dateOfBirth: new Date("1975"),
    nationality: ['USA'],
    postCode: '98108',
    city: 'Seattle',
    bio: 'Hi, I am JB Tellez and I am doing the Iron Hack Web Development Bootcamp!',
    socialNetworks: {
      slack: '@jb.tellez',
    },
    role: 'USER',
    studentId: '598351360920f7b1a274e538',
  },
]


/**
 * CREATE USERS
**/
// Add the users to the database
User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('---------------');
  console.log('USERS:');
  
  docs.forEach((user) => {
    console.log(user.email)
  });
  mongoose.connection.close();
});