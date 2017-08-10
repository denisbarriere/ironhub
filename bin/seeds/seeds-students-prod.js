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
    // Denis Barriere
    bootcampIds: ['598c85b230b3a200113de089'],
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
    // Cillian O Murchu
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/Chilliano',
      linkedIn: 'https://www.linkedin.com/in/spuca/',
    },
  },
  {
    // Julius Suominen
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/jsur',
      linkedIn: 'https://www.linkedin.com/in/julius-suominen',
    },
  },
  {
    // Arkadiusz Milewski
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/maliaaska',
    },
  },
  {
    // Christiana Koudigkeli
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/chrikoudi',
      linkedIn: 'https://www.linkedin.com/in/christianakoudigkeli/',
    },
  },
  {
    // Emilie Gourmanel
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      dribbble: 'https://dribbble.com/Adamanska',
      gitHub: 'https://github.com/AdamanskaHub',
      linkedIn: 'https://www.linkedin.com/in/emilie-gourmanel-19659123/',
      portfolio: 'https://www.behance.net/Adamanska',
    },
  },
  {
    // Petra Spirkova
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/PetraSp',
      linkedIn: 'https://www.linkedin.com/in/petra-spirkova-57833659/',
    },
  },
  {
    // Luis Amez
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/luis-amez',
      linkedIn: 'https://www.linkedin.com/in/luis-amez-148034149/',
    },
  },
  {
    // Stephanos Amez
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/stephanos7',
      linkedIn: 'https://www.linkedin.com/in/stephanostheodotou/',
    },
  },
  {
    // Jorge Avila
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/blackc0d3',
      linkedIn: 'https://www.linkedin.com/in/jorge-avila-haro-79462620/',
    },
  },
  {
    // Andrea Bravo
    bootcampIds: ['598cc45bf3ad284a06468c0f'],
    professionalNetworks: {
      webProjects: [
        { 
          title: 'ANDREA BRAVO',
          url: 'https://www.andreabravo.com'
        }
      ]
    },
  },
  {
    // Miguel Gomes
    bootcampIds: ['598c85b230b3a200113de089'],
    professionalNetworks: {
      gitHub: 'https://github.com/Mi6u3l',
      linkedIn: 'https://www.linkedin.com/in/miguelbragagomes/',
      webProjects: [
        { 
          title: 'Join the journey of a full-stack web developer',
          url: 'https://mi6u3l.github.io/'
        }
      ]
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
