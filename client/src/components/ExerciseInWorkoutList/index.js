import React from "react";

function ExerciseInWorkoutList(props) {
  console.log('PROPS', props.state.currentWorkout.exercises);

  return (
    <div className="my-2">
      <div className="flex-row">
        {props.state.currentWorkout.exercises.map(exercise => (
          <p><span style={{fontWeight: "bolder"}}>{exercise.name} -</span>
            {exercise.distance ? (<span > Distance: {exercise.distance}</span>) : ''}
            {exercise.time ? (<span> Time: {exercise.time}sec</span>) : ''}
            {exercise.reps ? (<span> Reps: {exercise.reps}</span>) : ''}
            {exercise.weight ? (<span> Weight: {exercise.weight}lbs</span>) : ''}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ExerciseInWorkoutList;