'use strict';

const mongoose = require('mongoose');

const reminderSchema = require('../models/reminderModel');

const Reminder = mongoose.model('reminder', reminderSchema);

const postReminder = (req, res) => {
  const newReminder = new Reminder(req.body);
  newReminder.save((err, reminder) => {
    if(err){
      res.send(err);
    }
    res.json(reminder); 
  });
}

const getReminder = (req, res) => {
  Reminder.find({}, (err, reminder) => {
    if (err) {
      res.send(err);
    }
    res.json(reminder);
  });
}

module.exports = {
  getReminder,
  postReminder
}