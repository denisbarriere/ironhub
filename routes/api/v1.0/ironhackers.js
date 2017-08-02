/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../../models/user-model');
const Student = require('../../../models/student-model'); // Required?
const Project = require('../../../models/project-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();


/**
 * ROUTES
**/

// IRONHACKERS
// GET /ironhackers retrieve the whole list of ironhackers
router.get('/', (req, res, next) => {
  User.find({}, 'email firstName lastName bio',(err, ironhackersList) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(ironhackersList);
  });
});

// POST /ironhackers to create a new ironhacker
// router.post('/', (req, res, next) => {
//   const theUser = new Project({
//     name: req.body.name,
//     contributors: req.body.contributors,
//     projectNumber: requ.body.projectNumber || 'Module 1',
//     description: req.body.description,
//     url: {
//       gitHub: req.body.gitHub,
//       screenshots: req.body.screenshots,
//       productUrl: req.body.productUrl,
//       presentationUrl: req.body.presentationUrl,
//     }
//   });

//   theUser.save((err) => {
//     if (err) {
//       res.status(400).json(err);
//       return;
//     }

//     res.status(201).json({
//       message: 'The new ironhacker was created successfully',
//       id: theProject._id
//     });
//   });
// });

// GET /ironhackers/:id to retrive the information of a specific ironhacker
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'The specified id is not valid' });
    return;
  }

  User.findById(req.params.id)
     .populate('studentId')
     .exec((err, theUser) => {
      if (err) {
        if (err.name === 'NotFoundError') {
          res.status(404).json(err);  
        } else {
          res.status(400).json(err);
        }
        console.log(err);
        res.status(404).json(err);
        return;
      }

      res.status(200).json(theUser);
    });
});

// PUT /ironhackers/:id to update the information of a specific ironhacker


// DELETE /ironhackers/:id to delete a specific ironhacker
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Remove references of the user in the project collection
  User.findById(req.params.id)
     .populate('studentId')
     .exec((err, theUser) => {
      if (err) {
        res.status(400).json(err);
        return;
      }

      Student.findById(theUser._id)
        .populate('projectIds')
        .exec((err, theStudent) => {
        if (err) {
          res.status(400).json(err);
          return;
        }
    });
  



  });
  // Remove references of the user in the student collection
  // Remove references of the user in the user collection
  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    return res.status(200).json({
      message: 'The Ironhacker has been removed successfully'
    });
  })
});

module.exports = router;
