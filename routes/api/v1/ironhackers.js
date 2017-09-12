/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../../models/user-model');
const Student = require('../../../models/student-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();


/**
 * ROUTES
**/

// IRONHACKERS

// GET /ironhackers => retrieve the list of all ironhackers (Students)
router.get('/ironhackers', (req, res, next) => {

  // Retrive the ironhacker information
  User.find({studentId: { $exists: true }})
    .populate({ 
     path: 'studentId',

     populate: {
       path: 'bootcampIds',
       model: 'Bootcamp',
     }
    })
    .exec((err, ironhackerList) => {
      if (err) {
      res.status(400).json(err);
      return;
    }

    res.status(200).json(ironhackerList);

  });
});


// POST /ironhackers => to create a new ironhacker
router.post('/ironhackers', (req, res, next) => {
  
  // Retrieve the information to update
  // For each ironhacker value, check if it is found in request before processing it
  let newUser = {}
  if (req.body.email) { newUser.email = req.body.email; }
  if (req.body.password) { newUser.password = req.body.password; }
  if (req.body.gender) { newUser.gender = req.body.gender; }
  if (req.body.firstName) { newUser.firstName = req.body.firstName; }
  if (req.body.lastName) { newUser.lastName = req.body.lastName; }
  if (req.body.dateOfBirth) { newUser.dateOfBirth = req.body.dateOfBirth; }
  if (req.body.nationality) { newUser.nationality = req.body.nationality; }
  if (req.body.address) { newUser.address = req.body.address; }
  if (req.body.postCode) { newUser.postCode = req.body.postCode; }
  if (req.body.city) { newUser.city = req.body.city; }
  if (req.body.bio) { newUser.bio = req.body.bio; }
  if (req.body.pictureUrl) { newUser.pictureUrl = req.body.pictureUrl; }
  if (req.body.socialNetworks) { 
    newUser.socialNetworks = {};
    if (req.body.socialNetworks.Facebook) { newUser.socialNetworks.Facebook = req.body.socialNetworks.Facebook; }  
    if (req.body.socialNetworks.Instagram) { newUser.socialNetworks.Instagram = req.body.socialNetworks.Instagram; }
    if (req.body.socialNetworks.skype) { newUser.socialNetworks.skype = req.body.socialNetworks.skype; }
    if (req.body.socialNetworks.slack) { newUser.socialNetworks.slack = req.body.socialNetworks.slack; }
    if (req.body.socialNetworks.twitter) { newUser.socialNetworks.twitter = req.body.socialNetworks.twitter; }
  }
  if (req.body.role) { newUser.role = req.body.role; }

  // For each student value, check if it is found in request before processing it
  let isStudent = false; // Used to know if student information was found in the body
  let newStudent = {}
  if (req.body.bootcampIds) { 
    newStudent.bootcampIds = [];
    req.body.bootcampIds.forEach((bootcampId, index) => {
      newStudent.bootcampIds[index] = bootcampId;
    }); 
  }
  if (req.body.professionalNetworks) { 
    isStudent = true;
    newStudent.professionalNetworks = {};
    if (req.body.professionalNetworks.dribbble) { newStudent.professionalNetworks.dribbble = req.body.professionalNetworks.dribbble; }  
    if (req.body.professionalNetworks.gitHub) { newStudent.professionalNetworks.gitHub = req.body.professionalNetworks.gitHub; }
    if (req.body.professionalNetworks.linkedIn) { newStudent.professionalNetworks.linkedIn = req.body.professionalNetworks.linkedIn; }
    if (req.body.professionalNetworks.portfolio) { newStudent.professionalNetworks.portfolio = req.body.professionalNetworks.portfolio; }
    if (req.body.professionalNetworks.webProjects) {
      newStudent.professionalNetworks.webProjects = [];
      req.body.professionalNetworks.webProjects.forEach((webProject, index) =>{
        if (webProject.title) { newStudent.professionalNetworks.webProjects[index].title = webProject.title; }
        if (webProject.url) { newStudent.professionalNetworks.webProjects[index].url = webProject.url; }      
      });
    }
  }

  // If student information was found, create the student
  if (isStudent) {
    const theStudent = new Student(newStudent);
    
    // Save the new student
    theStudent.save((err, newDocument) => {
      if (err) {
        res.status(400).json(err);
        return;
      }

      // Add the student ID to the newUser object
      newUser.studentId = newDocument._id;
    });
  } 

  const theIronhacker = new User(newUser);

  // Save the new ironhacker
  theIronhacker.save((err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    // API Response 
    res.status(201).json({
      message: 'The new ironhacker was created successfully',
      id: theIronhacker._id
    });
  });
});


// GET /ironhackers/:id => to retrive the information of a specific ironhacker
router.get('/ironhackers/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Find the ironhacker to retrieve
  User.find({'_id': req.params.id, studentId: { $exists: true }})
    .populate({ 
     path: 'studentId',
     populate: {
       path: 'bootcampIds',
       model: 'Bootcamp'
     }
    })
    .exec((err, theIronhacker) => {
      
    // If an error occured
      if (err) {
        res.status(400).json(err);
        return;
      }
    
      // If the ironhacker was not found
      if(!theIronhacker || theIronhacker.length === 0) {
        res.status(404).json({
          message: 'Ironhacker not found'
          });
        return;
      }

      // Else, everything went well
      res.status(200).json(theIronhacker[0]);
    });
});


// PUT /ironhackers/:id => to update the information of a specific ironhacker
router.put('/ironhackers/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Retrieve the information to update
  // For each value, check if it is found in request before processing it
  let updates = {}
  if (req.body.campus) { updates.campus = req.body.campus; }
  if (req.body.program) { updates.program = req.body.program; }
  if (req.body.startDate) { updates.startDate = req.body.startDate; }
  if (req.body.endDate) { updates.endDate = req.body.endDate; }
  if (req.body.language) { updates.language = req.body.language; }
  if (req.body.schedule) { updates.schedule = req.body.schedule; }
  if (req.body.price) { updates.price = req.body.price; }
  if (req.body.deposit) { updates.deposit = req.body.deposit; }
  if (req.body.womenScholarship) { updates.womenScholarship = req.body.womenScholarship; }
  if (req.body.currency) { updates.currency = req.body.currency; }
  if (req.body.cohortPictureUrl) { updates.cohortPictureUrl = req.body.cohortPictureUrl; }

  // Find the ironhacker to update and update
  User.findByIdAndUpdate(req.params.id, updates, (err, document) => {
   
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
   
    // If the ironhacker was not found
    if(!document || document.length === 0) { 
      res.status(404).json({
        message: 'Ironhacker not found'
      });
      return;
    }
   
    // Else, everything went well
    res.status(200).json({
      message: 'The ironhacker was updated successfully'
    });
  });
})


// DELETE /ironhackers/:id to delete a specific ironhacker
router.delete('/ironhackers/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Retrieve the ironhacker to remove
  User.findById(req.params.id, (err, theIronhacker) => {
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
    
    // If the ironhacker was not found
    if(!theIronhacker || theIronhacker.length === 0) {
      res.status(404).json({
        message: 'Ironhacker not found'
        });
      return;
    }

    // Else, everything went well. The ironhacker has been found
    theIronhacker.remove((err, removed) => {
      if (err) {
        res.status(400).json(err);
        return;
      }

      return res.status(200).json({
        message: 'The ironhacker has been removed successfully'
      });
    })
  });
});

module.exports = router;
