/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const Project = require('../models/project-model');
require("dotenv").config(); // To connect to the database

/**
 * MIDDLEWARE CONFIGURATION
**/
// Database connection
mongoose.connect(process.env.MONGODB_URI); // Databse name from local .env


/**
 * PROJECTS DATA
**/
const projects = [ 
  {
    name: 'M Y F O L T',
    contributors: ['5981a5a8eb27e46ae45e5f80'],
    endOfModuleProject: 'Module 1',
    description: 'Javascript version of F O L T, the iOS game',
    urls: {
      projectImageUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/3955600/Screen_Shot_2017-06-30_at_12.37.07_pm.png',
      gitHub: 'https://github.com/denisbarriere/ironhack-game',
      productUrl: 'https://denisbarriere.github.io/ironhack-game/',
      presentationUrl: 'http://slides.com/denisbarriere/m-y-f-o-l-t',
    }
  },
  {
    name: 'Ironhelp',
    contributors: ['5981a5a8eb27e46ae45e5f80', '5981a5681a48316adac79975'],
    endOfModuleProject: 'Module 2',
    description: 'The best documentation platform for developers, built by the community',
    urls: {
      projectImageUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/4001613/ironhelp-logo--green.png',
      gitHub: 'https://github.com/denisbarriere/ironhelp',
      productUrl: 'https://ironhelp.herokuapp.com',
      presentationUrl: 'http://slides.com/denisbarriere/ironhelp',
    }
  },
]


/**
 * CREATE PROJECTS
**/
// Add the projects to the database
Project.create(projects, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('---------------');
  console.log('PROJECTS:');
  
  docs.forEach((project) => {
    console.log(project.name)
  });
  mongoose.connection.close();
});
