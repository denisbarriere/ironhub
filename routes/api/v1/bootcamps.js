/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const mongoose = require('mongoose');
const Bootcamp = require('../../../models/bootcamp-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();


/**
 * ROUTES
**/

// BOOTCAMPS

// GET /bootcamps => retrieve the list of all bootcamps
router.get('/bootcamps', (req, res, next) => {

  // Retrive the bootcamp information
  Bootcamp.find({}, (err, bootcampList) => {
      
    if (err) {
      res.status(400).json(err);
      return;
    }

    res.status(200).json(bootcampList);
  });
});


// POST /bootcamps => to create a new bootcamp
router.post('/bootcamps', (req, res, next) => {
  
  // Retrieve the information to update
  // For each value, check if it is found in request before processing it
  let newBootcamp = {}
  if (req.body.campus) { newBootcamp.campus = req.body.campus; }
  if (req.body.program) { newBootcamp.program = req.body.program; }
  if (req.body.startDate) { newBootcamp.startDate = req.body.startDate; }
  if (req.body.endDate) { newBootcamp.endDate = req.body.endDate; }
  if (req.body.language) { newBootcamp.language = req.body.language; }
  if (req.body.schedule) { newBootcamp.schedule = req.body.schedule; }
  if (req.body.price) { newBootcamp.price = req.body.price; }
  if (req.body.deposit) { newBootcamp.deposit = req.body.deposit; }
  if (req.body.womenScholarship) { newBootcamp.womenScholarship = req.body.womenScholarship; }
  if (req.body.currency) { newBootcamp.currency = req.body.currency; }
  if (req.body.cohortPictureUrl) { newBootcamp.cohortPictureUrl = req.body.cohortPictureUrl; }

  const theBootcamp = new Bootcamp(newBootcamp);

  // Save the new bootcamp
  theBootcamp.save((err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    // API Response 
    res.status(201).json({
      message: 'The new bootcamp was created successfully',
      id: theBootcamp._id
    });
  });
});


// GET /bootcamps/:id => to retrive the information of a specific bootcamp
router.get('/bootcamps/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Find the bootcamp to retrieve
  Bootcamp.findById(req.params.id, (err, theBootcamp) => {
      
    // If an error occured
      if (err) {
        res.status(400).json(err);
        return;
      }
    
      // If the bootcamp was not found
      if(!theBootcamp || theBootcamp.length === 0) {
        res.status(404).json({
          message: 'Bootcamp not found'
          });
        return;
      }

      // Else, everything went well
      res.status(200).json(theBootcamp);
    });
});


// PUT /bootcamps/:id => to update the information of a specific bootcamp
router.put('/bootcamps/:id', (req, res) => {

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

  // Find the bootcamp to update and update
  Bootcamp.findByIdAndUpdate(req.params.id, updates, (err, document) => {
   
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
   
    // If the bootcamp was not found
    if(!document || document.length === 0) { 
      res.status(404).json({
        message: 'Bootcamp not found'
      });
      return;
    }
   
    // Else, everything went well
    res.status(200).json({
      message: 'The bootcamp was updated successfully'
    });
  });
})


// PUT /bootcamps/:id/students => to add new students to a bootcamp
router.put('/bootcamps/:id/students', (req, res) => {
  
  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  // Find the bootcamp to retrieve
  Bootcamp.findById(req.params.id, 'studentList', (err, theBootcamp) => {
      
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
    
    // If the bootcamp was not found
    if(!theBootcamp || theBootcamp.length === 0) {
      res.status(404).json({
        message: 'Bootcamp not found'
        });
      return;
    }

    // Else, everything went well. The bootcamp has been found
    // So, let's retrieve the list of students to add to the existing students
    const newStudents = req.body.studentList;

    // For each new student, add them to the list of students
    newStudents.forEach((student) => {
      theBootcamp.studentList.addToSet(student);  
    });

    // Save the change
    theBootcamp.save((err, updatedBootcamp) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      
      // API Response 
      res.status(201).json({
        message: 'The new contributors were added successfully',
        id: updatedBootcamp._id
      });
    });
  });
});


// DELETE /bootcamps/:id to delete a specific bootcamp
router.delete('/bootcamps/:id', (req, res) => {

  // Check that the id found in the params is valid
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Retrieve the bootcamp to remove
  Bootcamp.findById(req.params.id, (err, theBootcamp) => {
    // If an error occured
    if (err) {
      res.status(400).json(err);
      return;
    }
    
    // If the bootcamp was not found
    if(!theBootcamp || theBootcamp.length === 0) {
      res.status(404).json({
        message: 'Bootcamp not found'
        });
      return;
    }

    // Else, everything went well. The bootcamp has been found
  
    // First, clean references to a bootcamp in students (only this bootcamp)
    //TODO: Student.update({'bootcampIds': req.params.id}, { $unset: { bootcampIds: "" } }, (err) => {
    //   // If an error occured
    //   if (err) {
    //     res.status(400).json(err);
    //     return;
    //   }      
    // });

    // Then delete the bootcamp document    
    theBootcamp.remove((err, removed) => {
      if (err) {
        res.status(400).json(err);
        return;
      }

      return res.status(200).json({
        message: 'The bootcamp has been removed successfully'
      });
    })
  });
});

module.exports = router;
