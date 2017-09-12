/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const Project = require('../../models/project-model');

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
    contributors: ['5982f74c6a05fc8ef0d9ff5e'],
    endOfModuleProject: 'Module 1',
    tagline: 'Javascript version of F O L T, the iOS game',
    shortDescription: 'Javascript version of F O L T, the iOS game',
    description: 'Javascript version of F O L T, the iOS game',
    hashtags: ['#js','#game'],
    urls: {
      gitHub: 'https://github.com/denisbarriere/ironhack-game',
      productUrl: 'https://denisbarriere.github.io/ironhack-game/',
      projectImageUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/3955600/Screen_Shot_2017-06-30_at_12.37.07_pm.png',
      slidePresentationUrl: 'https://slides.com/denisbarriere/m-y-f-o-l-t',
      videoPresentationUrl: 'https://youtube.com',
    }
  },
  {
    name: 'Ironhelp',
    contributors: ['5982f74c6a05fc8ef0d9ff5e', '5982f74c6a05fc8ef0d9ff5f'],
    endOfModuleProject: 'Module 2',
    tagline: 'The best documentation platform for developers',
    shortDescription: 'The best documentation platform for developers',
    description: 'The best documentation platform for developers, built by the community',
    hashtags: ['#js','#express','mongodb'],
    urls: {
      gitHub: 'https://github.com/denisbarriere/ironhelp',
      productUrl: 'https://ironhelp.herokuapp.com',
      projectImageUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/4001613/ironhelp-logo--green.png',
      screenshots: [{
        title: "Homepage capture",
        url: "https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/3955600/Screen_Shot_2017-06-30_at_12.37.07_pm.png"
      }],
      slidePresentationUrl: 'https://slides.com/denisbarriere/ironhelp',
      videoPresentationUrl: 'https://youtube.com',
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
