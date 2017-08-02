'use strict';
/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
require('mongoose-type-url');


/**
 * COLLECTION DEFINITION
**/
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  contributors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: 'Ironhacker'
  }],
  endOfModuleProject: {
    type: String,
		enum: ['Module 1', 'Module 2', 'Final'],
    default: 'Module 1'
  },
  description: String,
  urls: {
    projectImageUrl: mongoose.SchemaTypes.Url,
    gitHub: {
      type: mongoose.SchemaTypes.Url, 
      required: [true, 'The GitHub URL is required']
    },
    screenshots: [{
      title: String,
      url: mongoose.SchemaTypes.Url
    }],
    productUrl: {
      type: mongoose.SchemaTypes.Url, 
      required: [true, 'The product URL is required']
    },
    presentationUrl: mongoose.SchemaTypes.Url,
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
