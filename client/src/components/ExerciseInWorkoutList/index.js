import React, { useEffect } from "react";
import Auth from '../../utils/auth'
import { REMOVE_EXERCISE } from '../../utils/mutations'
import { useMutation } from '@apollo/react-hooks';

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CURRENT_WORKOUT } from '../../utils/actions';

function ExerciseInWorkoutList() {
  const [state, dispatch] = useStoreContext();
  const [removeExercise, {error}] = useMutation(REMOVE_EXERCISE);
  const handleDeleteExercise = async (exerciseId, workoutId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeExercise({
        variables: { exerciseId, workoutId }
      });
      dispatch({
        type: REMOVE_FROM_CURRENT_WORKOUT,
        _id: exerciseId
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log(`RERENDER: STATE IS`, state.currentWorkout );
  }, [state.currentWorkout]);

  return (
    <div className="my-2">
      <div className="flex-row">
        { state.currentWorkout.exercises.map(exercise => (
          <p 
            className="workout-text"
            key={exercise._id}
          >
            <span style={{fontWeight: "bolder"}}>{exercise.name} -</span>
            {exercise.distance ? (<span > Distance: {exercise.distance}</span>) : ''}
            {exercise.time ? (<span> Time: {exercise.time}sec</span>) : ''}
            {exercise.reps ? (<span> Reps: {exercise.reps}</span>) : ''}
            {exercise.weight ? (<span> Weight: {exercise.weight}lbs</span>) : ''}

            <button onClick={() => {
              handleDeleteExercise(exercise._id, state.currentWorkout._id)
            }}>X</button>          
          </p>
        ))}
      </div>
    </div>
  )
}

export default ExerciseInWorkoutList;