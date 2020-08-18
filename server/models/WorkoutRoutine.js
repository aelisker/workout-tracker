const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const routineExerciseSchema = new Schema({
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
    min: 0
  },
  trackReps: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Number,
    min: 0
  },
  trackWeight: {
    type: Boolean,
    default: false
  },
  distance: {
    type: Number,
    min: 0
  },
  trackDistance: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number,
    min: 0
  },
  trackTime: {
    type: Boolean,
    default: false
  },
  workoutCategory: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutCategory'
  }
  // individExercise: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'IndividualExercise'
  // }
});

const workoutRoutineSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   unique: true
  // },
  workoutDate: {
    // type: String,
    // default: moment(Date.now()).format("MMM Do YY"),
    type: Date,
    default: Date.now(),
    required: true
  },
  exercises: [routineExerciseSchema]
});

const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);
// const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);

module.exports = WorkoutRoutine;