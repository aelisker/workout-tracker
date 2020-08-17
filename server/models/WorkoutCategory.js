const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const WorkoutCategory = mongoose.model('WorkoutCategory', workoutCategorySchema);

module.exports = WorkoutCategory;
