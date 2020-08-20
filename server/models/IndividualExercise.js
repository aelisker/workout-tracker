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
  imageName: {
    type: String,
    trim: true
  },
  trackReps: {
    type: Boolean,
    default: false
  },
  trackWeight: {
    type: Boolean,
    default: false
  },
  trackDistance: {
    type: Boolean,
    default: false
  },
  trackTime: {
    type: Boolean,
    default: false
  },
  workoutCategory: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutCategory'
  }
});

const IndividualExercise = mongoose.model('IndividualExercise', individualExerciseSchema);

module.exports = IndividualExercise;
