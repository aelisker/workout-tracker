const mongoose = require('mongoose');

const { Schema } = mongoose;

const individualExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  videoLink: {
    type: String,
    trim: true 
  },
  reps: {
    type: Number,
  },
  // since these are not required, will try to figure way to allow user to choose weight time or distance
  weight: {
    type: Number,
    min: 0
  },
  distance: {
    type: Number,
    min: 0
  },
  time: {
    type: Number,
    min: 0
  },
  workoutCategory: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutCategory',
    required: true
  }
});

const IndividualExercise = mongoose.model('IndividualExercise', individualExerciseSchema);

module.exports = IndividualExercise;
