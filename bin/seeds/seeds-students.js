/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const Student = require('../../models/student-model');
require("dotenv").config(); // To connect to the database


/**
 * MIDDLEWARE CONFIGURATION
**/
// Database connection
mongoose.connect(process.env.MONGODB_URI); // Databse name from local .env


/**
 * STUDENTS DATA
**/
const students = [
  {
    bootcampIds: ['5983511cfb689ab18c25804b'],
    professionalNetworks: {
      gitHub: 'https://github.com/denisbarriere',
      linkedIn: 'https://www.linkedin.com/in/denisbarriere/',
      webProjects: [
        { 
          title: 'Idecologie',
          url: 'https://www.idecologie.net'
        }
      ]
    },
  },
  {
    bootcampIds: ['5983511cfb689ab18c25804b'],
    professionalNetworks: {
      gitHub: 'https://github.com/JB-Tellez',
    },
  },
]


/**
 * CREATE STUDENTS
**/
// Add the students to the database
Student.create(students, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('---------------');
  console.log('STUDENTS:');
  
  docs.forEach((student) => {
    console.log(student._id)
  });
  mongoose.connection.close();
});
