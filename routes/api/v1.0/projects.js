/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const mongoose = require('mongoose');
const Student = require('../../../models/student-model'); // Required?
const Project = require('../../../models/project-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();


/**
 * ROUTES
**/
// PROJECTS
/* GET /projects retrieve the whole list of projects
   or  
   GET /projects?ironhacker= retrieve the list of project of a specific ironhacker (User)
*/
router.get('/', (req, res, next) => {
  var ironhacker = req.query.ironhacker;
  // If ironhacker is found in the query, then only get the projects that ironhacker contributed to
  if (ironhacker) { 
    Project.find({contributors: {$in: ironhacker}},
      'name contributors endOfModuleProject description url.projectImageUrl',
      (err, projectList) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      console.log("Project List: ",projectList)
      res.status(200).json(projectList);
    });
  // Else, load all projects
  } else {
    Project.find({}, 'name contributors endOfModuleProject description url.projectImageUrl', (err, projectList) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(projectList);
    });
  }
});

// POST /projects to create a new project
router.post('/', (req, res, next) => {
  const theProject = new Project({
    name: req.body.name,
    contributors: req.body.contributors,
    endOfModuleProject: requ.body.endOfModuleProject || 'Module 1',
    description: req.body.description,
    url: {
      gitHub: req.body.gitHub,
      screenshots: req.body.screenshots,
      productUrl: req.body.productUrl,
      presentationUrl: req.body.presentationUrl,
    }
  });

  theProject.save((err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    res.status(201).json({
      message: 'The new project was created successfully',
      id: theProject._id
    });
  });
});

// GET /projects/:id to retrive the information of a specific project
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  Project.findById(req.params.id)
     .populate('contributors')
     .exec((err, theProject) => {
      if (err) {
        res.status(404).json(err);
        return;
      }

      res.status(200).json(theProject);
    });
});

// PUT /projects/:id to update the information of a specific project
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    contributors: req.body.contributors,
    endOfModuleProject: requ.body.endOfModuleProject || 'Module 1',
    description: req.body.description,
    url: {
      gitHub: req.body.gitHub,
      screenshots: req.body.screenshots,
      productUrl: req.body.productUrl,
      presentationUrl: req.body.presentationUrl,
    }
  };

  Project.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    res.status(200).json({
      message: 'The project was updated successfully'
    });
  });
})

// DELETE /projects/:id to delete a specific project
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    return res.status(200).json({
      message: 'The project has been removed successfully'
    });
  })
});

module.exports = router;
