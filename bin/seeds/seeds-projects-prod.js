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
    endOfModuleProject: 'Module 1',
    tagline: 'F O L T, the iOS game in your browser!',
    shortDescription: 'A javascript version of F O L T, the iOS game',
    description: 'F O L T is a great puzzle game for iOS. Flip tiles and match colors to move your way through levels in this beautiful, minimalist puzzle game.',
    hashtags: ['#js','#game'],
    urls: {
      gitHub: 'https://github.com/denisbarriere/ironhack-game',
      productUrl: 'https://denisbarriere.github.io/ironhack-game/',
      projectImageUrl: 'https://i.imgur.com/dzQkkW3.png',
      slidePresentationUrl: 'https://slides.com/denisbarriere/m-y-f-o-l-t',
    }
  },
  {
    name: 'Ironhelp',
    endOfModuleProject: 'Module 2',
    tagline: 'Documentation sucks!',
    shortDescription: 'The best documentation platform for developers',
    description: 'The best documentation platform for developers, built by the community',
    hashtags: ['#js','#express','#mongodb','#mongoose'],
    urls: {
      gitHub: 'https://github.com/denisbarriere/ironhelp',
      productUrl: 'https://ironhelp.herokuapp.com',
      projectImageUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/4001613/ironhelp-logo--green.png',
      slidePresentationUrl: 'https://slides.com/denisbarriere/ironhelp',
    }
  },
  {
    name: 'Ironhub',
    endOfModuleProject: 'Module 3',
    tagline: 'The place to keep ironhackers in touch',
    shortDescription: 'The Ironhack student hub for sharing information and projects',
    description: `There are a lot of people at Ironhack. The Ironhub is here to help keep the community alive by giving tools to find ironhackers and projects easily.
  The API can be found here: https://github.com/denisbarriere/ironhub-api`,
    hashtags: ['#mean','#bulma'],
    urls: {
      gitHub: 'https://github.com/denisbarriere/ironhub-app',
      productUrl: 'https://ironhub-app.herokuapp.com/',
      projectImageUrl: 'https://ironhub-app.herokuapp.com/assets/images/ironhub-logo.png',
    }
  },
  {
    name: 'MoneyTracker',
    endOfModuleProject: 'Module 3',
    tagline: 'Keep track of your spendings',
    shortDescription: 'Keep track of your spendings',
    description: "Just a money tracker that doesn't work...",
    hashtags: ['#sad','#cash'],
    urls: {
      gitHub: 'https://github.com/AdamanskaHub/moneyTracker',
    }
  },
  {
    name: 'Appli',
    endOfModuleProject: 'Module 3',
    tagline: 'A Trello for job applications',
    shortDescription: 'Keep track of your job applications',
    description: "A tool for managing a job applicant's applications.",
    hashtags: ['#job','#povertyavoidance'],
    urls: {
      gitHub: 'https://github.com/jsur/jobs-front',
      productUrl: 'https://appli-app.herokuapp.com/',
      screenshots: [{
        title: "Dashboard",
        url: "https://i.imgur.com/w6ZnWxV.png"
      }],
    }
  },
  {
    name: 'ParkSocial',
    endOfModuleProject: 'Module 3',
    tagline: 'Parking spaces communities',
    shortDescription: 'Share parking spots around town',
    description: 'A tool for sharing parking spots',
    hashtags: ['#parkingspot','#ilovethisapp'],
    urls: {
      gitHub: 'https://github.com/mi6u3l/parksocial',
      productUrl: 'https://appli-app.herokuapp.com/',
      projectImageUrl: 'https://i.imgur.com/mC6soXB.png',
      screenshots: [{
        title: "Dashboard",
        url: "https://camo.githubusercontent.com/2c8b197fe7d6b06e1b01c65ea6627b71090fde79/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f7061726b736f6369616c2d3137353231362e61707073706f742e636f6d2f6f2f696d616765732532467061726b736f6369616c2e706e673f616c743d6d6564696126746f6b656e3d37346238323131652d343330342d343333392d386133322d303933623066343662333137"
      }],
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
