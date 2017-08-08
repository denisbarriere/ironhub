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
      ref: 'User'
  }],
  endOfModuleProject: {
    type: String,
		enum: ['Module 1', 'Module 2', 'Module 3'],
    default: 'Module 1'
  },
  tagLine: { type: String, maxlength: 100 },
  shortDescription: { type: String, maxlength: 100 },
  description: String,
  hashtags: [String],
  urls: {
    gitHub: { type: mongoose.SchemaTypes.Url },
    productUrl: { type: mongoose.SchemaTypes.Url, required: [true, 'Product URL is required'], },
    projectImageUrl: mongoose.SchemaTypes.Url,
    screenshots: [
      {
        title: String,
        url: mongoose.SchemaTypes.Url
      }
    ],
    slidePresentationUrl: mongoose.SchemaTypes.Url,
    videoPresentationUrl: mongoose.SchemaTypes.Url,
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
