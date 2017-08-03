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
  bootcampIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bootcamp'
    },
  ],
  professionalNetworks: {
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
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
