const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutRoutineSchema = new Schema({
  workoutDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'IndividualExercise'
    }
  ]
});

const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);

module.exports = WorkoutRoutine;