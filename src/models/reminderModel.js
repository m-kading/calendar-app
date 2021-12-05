'use strict';

const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Enter a title'
  },
  description: {
    type: String,
    required: 'Enter a description'
  },
  date: {
    type: Date,
    require: 'Enter a Date/Time'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = reminderSchema;