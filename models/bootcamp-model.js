'use strict';
/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
require('mongoose-type-url');


/**
 * COLLECTION DEFINITION
**/
const bootcampSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: [true, 'The start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'The end date is required']
  },
  language: {
    type: String,
    required: [true, 'The language is required'],
    enum: ['English', 'Spanish'],
    default: 'English'
  },
  schedule: String,
  price: Number,
  discountedPrice: Number,
  deposit: Number,
  womenScholarship: Number,
  currency: {
    type: String,
    enum: ['EUR', 'USD', 'MXN'],
    default: 'EUR'
  },
  cohortPictureUrl: mongoose.SchemaTypes.Url,
  studentList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  // teachersList: [{
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Teachers'
  // }],
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;
