/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const User = require('../../models/user-model');
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
    // Denis Barriere
    email: 'denis.barriere@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Denis',
    lastName: 'Barriere',
    dateOfBirth: new Date("1981-10-10"),
    nationality: ['French', 'Australian'],
    address: 'Carrer de Vallirana, 40, principal 1',
    postCode: '08006',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 684 116 853',
    bio: 'I am a Scrum Master, former Technical Business Analyst & Tester and C# Developer',
    pictureUrl: 'https://i.imgur.com/6A25UGk.png',
    socialNetworks: {
      facebook: 'https://www.facebook.com/denis.barriere',
      instagram: 'https://www.instagram.com/the_aussie_shot/',
      skype: 'denis.barriere',
      slack: '@denis.barriere',
    },
    role: 'ADMIN',
    studentId: '598cc57f0b8bf90004ec779b',
  },
  {
    // Cillian O Murchu
    email: 'cillian.murchu@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Cillian',
    lastName: 'O Murchu',
    dateOfBirth: new Date("1985-10-04"),
    nationality: ['Irish'],
    city: 'Meath',
    country: 'Ireland',
    bio: 'Full time poker player/drinker/extreme Sportsman, I also like to code sometimes',
    bioFull: 'Full time pokerplayer/drinker/extremeSportsman, i also like to code sometimes and am a junior Full stack Javascript developer',
    pictureUrl: 'https://avatars2.githubusercontent.com/u/28197099?v=4&u=5a01d01d8d32fedf5bbd652775b1c43701847d59&s=400',
    socialNetworks: {
      facebook: 'https://www.facebook.com/CillianoMurchu',
      skype: 'irene@ironhack.com',
      slack: '@cillian.murchu',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec779d'
  },
  {
    // Julius Suominen
    email: 'julius.suominen@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Julius',
    lastName: 'Suominen',
    dateOfBirth: new Date("1988-07-21"),
    nationality: ['Finnish'],
    address: 'Carrer de Neptu 28 2-4',
    postCode: '08006',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 690 84 6118',
    bio: 'Full stack Javascript developer',  
    pictureUrl: 'https://i.imgur.com/5GM2K5X.jpg',
    socialNetworks: {
      facebook: 'https://www.facebook.com/jsur5000',
      skype: 'julius.suominen',
      slack: '@julius.suominen',
      twitter: 'https://twitter.com/jsur',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec779e',
  },
  {
    // Arkadiusz Milewski
    email: 'arek.jajo2@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Arkadiusz',
    lastName: 'Milewski',
    dateOfBirth: new Date("1990-05-12"),
    nationality: ['Polish'],
    addresse: 'Carrer de Jupiter 69',
    postCode: '08013',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 672 556 545',
    bio: 'Full stack Javascript developer',
    pictureUrl: 'https://i.imgur.com/s57Micg.jpg',
    socialNetworks: {
      facebook: 'https://www.facebook.com/asmilewski',
      skype: 'arkkadio300',
      slack: '@arkadiusz.milewski',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec779f',
  },
   {
    // Christiana Koudigkeli
    email: 'ckoudigkeli@gmail.com',
    password: hashPass,
    gender: 'Female',
    firstName: 'Christiana',
    lastName: 'Koudigkeli',
    dateOfBirth: new Date("1994-02-02"),
    nationality: ['Greek'],
    addresse: 'Nikitara 2',
    postCode: '11146',
    city: 'Athens',
    country: 'Greece',
    phone: '+30 6974699624',
    bio: "I'm studying Electrical Engineering & Computer Science, I travel, read and eat a lot",
    bioFull: "I'm studying Electrical Engineering & Computer Science, I travel, read and eat a lot. I'm working on becoming a full stack developer, at least for the beginning of my career.",
    pictureUrl: 'https://goo.gl/YJeJZ7',
    socialNetworks: {
      facebook: 'https://www.facebook.com/christiana.koudigkeli',
      instagram: 'https://www.instagram.com/christianakoud/',
      skype: 'christiana.koudigkeli',
      slack: '@christiana',
      twitter: 'https://twitter.com/chrikoud',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a0',
  },
  {
    // Emilie Gourmanel
    email: 'adamanska@gmail.com',
    password: hashPass,
    gender: 'Female',
    firstName: 'Emilie',
    lastName: 'Gourmanel',
    dateOfBirth: new Date("1984-03-06"),
    nationality: ['French', 'Swiss'],
    addresse: 'Chemin de la Crétaux',
    postCode: '1196',
    city: 'Gland',
    country: 'Switzerland',
    phone: '+41 786892476',
    bio: "UX/UI/Front-end Unicorn ! Can even do 3d and games!",
    pictureUrl: 'https://i.imgur.com/9fJ0wlv.jpg',
    socialNetworks: {
      slack: '@emilie',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a1',
  },
  {
    // Petra Spirkova
    email: 'pspirkova@gmail.com',
    password: hashPass,
    gender: 'Female',
    firstName: 'Petra',
    lastName: 'Spirkova',
    dateOfBirth: new Date("1985-07-28"),
    nationality: ['Czech'],
    phone: '+34 617 576 484',
    bio: "Full stack Javascript developer",
    pictureUrl: 'https://i.imgur.com/hg9RWmX.jpg',
    socialNetworks: {
      facebook: 'https://www.facebook.com/petra.spirkova',
      instagram: 'https://www.instagram.com/petraspirk/',
      slack: '@petra.spirkova',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a2',
  },
  {
    // Luis Amez
    email: 'luis.amez.vitoria@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Luis',
    lastName: 'Amez',
    dateOfBirth: new Date("1984-08-03"),
    nationality: ['Spanish'],
    address: 'C/ Almogavers, 6, 5',
    postCode: '08018',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 622 002 528',
    bio: "I'm Batman. Don't tell to anyone, please. It's a secret.",
    bioFull: "I'm Batman. Don't tell to anyone, please. It's a secret. When I'm not doing my Batman things (or Bat-things) I love to read, to code and to eat. Even better with friends.",
    pictureUrl: 'https://i.imgur.com/5WgvahL.png',
    socialNetworks: {
      slack: '@lamez',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a3',
  },
  {
    // Stephanos Amez
    email: 'stephanos.theodotou@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Stephanos',
    lastName: 'Theodotou',
    nationality: ['Cypriot'],
    address: 'Hopefully, i will know very soon!',
    phone: '+447856422841',
    bio: "Technology Analyst",
    pictureUrl: 'https://i.imgur.com/SuYwc06.jpg',
    socialNetworks: {
      slack: '@stephanos',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a4',
  },
  {
    // Jorge Avila
    email: 'javila83@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Jorge',
    lastName: 'Avila',
    dateOfBirth: new Date("1983-03-31"),    
    nationality: ['Mexican'],
    address: 'Av. Diagonal 287',
    postCode: '08013',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 679 797 722',
    bio: "Technology Analyst",
    pictureUrl: 'https://i.imgur.com/UklONwP.jpg',
    socialNetworks: {
      instagram: "https://www.instagram.com/jaah.mx/",
      skype: 'javila83',
      slack: '@jorge.avila',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a5',
  },
  {
    // Andrea Bravo
    email: 'hola@andreabravo.com',
    password: hashPass,
    gender: 'Female',
    firstName: 'Andrea',
    lastName: 'Bravo',
    dateOfBirth: new Date("1987-02-07"),    
    nationality: ['Spanish'],
    city: 'Barcelona',
    country: 'Spain',
    phone: '+336 49 19 18 08',
    bio: "Technology Analyst",
    bioFull: "Visual creative technologist : interaction design // Virtual Reality // Photography",
    socialNetworks: {
      slack: '@abravo',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a6',
  },
  {
    // Miguel Gomes
    email: 'miguel.bgomes@gmail.com',
    password: hashPass,
    gender: 'Male',
    firstName: 'Miguel',
    lastName: 'Gomes',
    dateOfBirth: new Date("1981-08-01"),    
    nationality: ['Portuguese'],
    address: "Carrer Sanho d'Avlla 11",
    postCode: '08019',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 45352342',
    bio: "Cirque du soleil trapeze artist",
    pictureUrl: 'https://i.imgur.com/uXmtNhE.jpg',
    socialNetworks: {
      instagram: "https://www.instagram.com/jaah.mx/",
      slack: '@migu3l',
    },
    role: 'USER',
    studentId: '598cc57f0b8bf90004ec77a8',
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