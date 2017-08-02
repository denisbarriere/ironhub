/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const Student = require('../models/student-model');
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
    bootcamp: {
      campus: 'Barcelona',
      program: 'Web Development Bootcamp',
      date: new Date('2017-06-12'),
      projectIds: [
        '5980d14bb3cb55637f3969fd',
        '5980d14bb3cb55637f3969fe'
      ],
    },
    professional: {
      urls: {
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
  },
  {
    bootcamp: {
      campus: 'Barcelona',
      program: 'Web Development Bootcamp',
      date: new Date('2017-06-12'),
      projectIds: [
        '5980d14bb3cb55637f3969fe'
      ],
    },
    professional: {
      urls: {
        gitHub: 'https://github.com/JB-Tellez',
      },
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
