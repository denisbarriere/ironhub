/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const mongoose = require('mongoose');
const Project = require('../../../models/project-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();


/**
 * ROUTES
**/

// PROJECTS

/* GET /projects => retrieve the list of all projects
   GET /projects?limit=&offset= => retrive the a limited set of projects (number of projects = limit, from = offset)
   GET /projects?ironhacker= => retrieve the list of project of a specific ironhacker (User)
*/
router.get('/projects', (req, res, next) => {
  
  // Retrieve query string from URL, if any
  const ironhacker = req.query.ironhacker;
  const limit = req.query.limit;
  const offset = req.query.offset;
  
  // If 'ironhacker' is found in the query,
  // then only get the projects that ironhacker contributed to
  if (ironhacker) { 

    // Check that the id found in the params is valid
    if(!mongoose.Types.ObjectId.isValid(ironhacker)) {
      res.status(400).json({ message: 'The specified id is not valid'});
      return;
    }

    // If the ID is valid
    Project.find({contributors: mongoose.Types.ObjectId(ironhacker)}, 
      'name contributors endOfModuleProject shortDescription urls.projectImageUrl')
      .populate('contributors')
      .exec((err, allProjects) => {
     
      // If an error occured
      if (err) {
        res.status(400).json(err);
        return;
      }
     
      // If the project was not found
      if(!allProjects || allProjects.length === 0 ) {
        res.status(404).json({
          message: 'No project was found for this contributor'
          });
        return;
      }

      // Else, everything went well
      res.status(200).json(allProjects);
    });

  // Else, load a specific set of projects 
  } else if (limit && offset) {

    // Convert to number (comes as string from the query)
    let _limit = Number(limit);
    let _offset = Number(offset);

    Project.find({},
      'name contributors endOfModuleProject shortDescription urls.projectImageUrl')
        .populate('contributors')
        .skip(_offset > 0 ? _offset: 0)
        .limit(_limit)
        .exec((err, projectList) => {
      
      if (err) {
        res.status(400).json(err);
        return;
      }

      res.status(200).json(projectList);
    });
  // Else, load all projects
  } else {

    Project.find({},
      'name contributors endOfModuleProject shortDescription urls.projectImageUrl')
        .populate('contributors')
        .exec((err, projectList) => {
      
      if (err) {
        res.status(400).json(err);
        return;
      }

      res.status(200).json(projectList);
    });
  }
});


// POST /projects => to create a new project
router.post('/projects', (req, res, next) => {
  
  // Retrieve the information to update
  // For each value, check if it is found in request before processing it
  let newProject = {}
  if (req.body.name) { newProject.name = req.body.name; }
  if (req.body.contributors) { 
    newProject.contributors = [];
    req.body.contributors.forEach((contributor, index) => {
      newProject.contributors[index] = contributor; 
    });
  }
  if (req.body.endOfModuleProject) { newProject.endOfModuleProject = req.body.endOfModuleProject; }
  if (req.body.description) { newProject.description = req.body.description; }
  if ( req.body.urls ) {
    newProject.urls = {}; // if the .urls is found, then initialise it in the newProject object
    if (req.body.urls.gitHub) { newProject.urls.gitHub = req.body.urls.gitHub; }
    if (req.body.urls.screenshots) { 
      newProject.urls.screenshots = [];
      req.body.urls.screenshots.forEach((screenshot, index) => {
        if (screenshot.title) { newProject.urls.screenshots[index].title = screenshot.title; }
        if (screenshot.url) { newProject.urls.screenshots[index].url = screenshot.title; }
      });
    }
    if (req.body.urls.productUrl) { newProject.urls.productUrl = req.body.urls.productUrl; }
    if (req.body.urls.slidePresentationUrl) { newProject.urls.slidePresentationUrl = req.body.urls.slidePresentationUrl; }
    if (req.body.urls.videoPresentationUrl) { newProject.urls.videoPresentationUrl = req.body.urls.videoPresentationUrl; }  
  }

  const theProject = new Project(newProject);

  // Save the new project
  theProject.save((err) => {
    if (err) {
      res.status(400).json(err);
      console.log(err)
      return;
    }

    // API Response 
    res.status(201).json({
      message: 'The new project was created successfully',
      id: theProject._id
    });
  });
});


// GET /projects/:id => to retrive the information of a specific project
router.get('/projects/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Find the project to retrieve
  Project.findById(req.params.id, 
    'name endOfModuleProject type urls contributors description')
    .populate('contributors')
    .exec((err, theProject) => {
      
    // If an error occured
      if (err) {
        res.status(400).json(err);
        return;
      }
    
      // If the project was not found
      if(!theProject || theProject.length === 0) {
        res.status(404).json({
          message: 'Project not found'
          });
        return;
      }

      // Else, everything went well
      res.status(200).json(theProject);
    });
});


// PUT /projects/:id => to update the information of a specific project
router.put('/projects/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Retrieve the information to update
  // For each value, check if it is found in request before processing it
  let updates = {}
  if (req.body.name) { updates.name = req.body.name; }
  if (req.body.contributors) { 
    updates.contributors = [];
    req.body.contributors.forEach((contributor, index) => {
      updates.contributors[index] = contributor; 
    });
  }
  if (req.body.endOfModuleProject) { updates.endOfModuleProject = req.body.endOfModuleProject; }
  if (req.body.description) { updates.description = req.body.description; }
  if ( req.body.urls ) {
    newProject.urls = {}; // if the .urls is found, then initialise it in the newProject object
    if (req.body.urls.gitHub) { updates.urls.gitHub = req.body.urls.gitHub; }
    if (req.body.urls.screenshots) { 
      updates.urls.screenshots = [];
      req.body.urls.screenshots.forEach((screenshot, index) => {
        if (screenshot.title) { updates.urls.screenshots[index].title = screenshot.title; }
        if (screenshot.url) { updates.urls.screenshots[index].url = screenshot.title; }
      });
    }
    if (req.body.urls.productUrl) { updates.urls.productUrl = req.body.urls.productUrl; }
    if (req.body.urls.slidePresentationUrl) { updates.urls.slidePresentationUrl = req.body.urls.slidePresentationUrl; }
    if (req.body.urls.videoPresentationUrl) { updates.urls.videoPresentationUrl = req.body.urls.videoPresentationUrl; }  
  }

  // Find the project to update and update
  Project.findByIdAndUpdate(req.params.id, updates, (err, document) => {
   
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
   
    // If the project was not found
    if(!document || document.length === 0) { 
      res.status(404).json({
        message: 'Project not found'
      });
      return;
    }
   
    // Else, everything went well
    res.status(200).json({
      message: 'The project was updated successfully'
    });
  });
})


// PUT /projects/:id/contributors => to add new contributors to a project
router.put('/projects/:id/contributors', (req, res) => {
  
  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Find the project to retrieve
  Project.findById(req.params.id, 'contributors', (err, theProject) => {
      
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
    
    // If the project was not found
    if(!theProject || theProject.length === 0) {
      res.status(404).json({
        message: 'Project not found'
        });
      return;
    }

    // Else, everything went well. The project has been found
    // So, let's retrieve the list of contributors to add to the existing contributors
    const newContributors = req.body.contributors;

    // For each new contributor, add them to the list of contributors
    newContributors.forEach((contributor) => {
      theProject.contributors.addToSet(contributor);  
    });

    // Save the change
    theProject.save((err, updatedProject) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      
      // API Response 
      res.status(201).json({
        message: 'The new contributors were added successfully',
        id: updatedProject._id
      });
    });
  });
});


// DELETE /projects/:id to delete a specific project
router.delete('/projects/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
   
  // Else, everything went well. The project has been found
  Project.remove({_id: req.params.id}, (err, removed) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
console.log(removed.documents);
    if(!removed || removed.length === 0) {
      res.status(404).json({
        message: 'Project not found'
      });
    }

    return res.status(200).json({
      message: 'The project has been removed successfully'
    });
  });
});

module.exports = router;
