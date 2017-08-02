'use strict';
/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
require('mongoose-type-url');


/**
 * COLLECTION DEFINITION
**/
const studentSchema = new mongoose.Schema({
  bootcamp: {
    campus: {
      type: String,
      required: [true, 'The campus is required'],
      enum: ['Madrid', 'Barcelona', 'Miami', 'Paris', 'Mexico'],
      default: 'Madrid'
    },
    program: {
      type: String,
      required: [true, 'The program is required'],
      enum: ['Web Development Bootcamp', 'UX/UI Design Bootcamp', 'Web Development Part-Time', 'UX/UI Design Part-Time'],
      default: 'Web Development Bootcamp'
    },
    date: {
      type: Date,
      required: [true, 'The date is required']
    },
    projectIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
  },
  professional: {
    urls: {
      dribbble: mongoose.SchemaTypes.Url,
      gitHub: mongoose.SchemaTypes.Url,
      linkedIn: mongoose.SchemaTypes.Url,
      portfolio: mongoose.SchemaTypes.Url,
      webProjects: [{ 
        title: String,
        url: mongoose.SchemaTypes.Url
      }]
    },
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
