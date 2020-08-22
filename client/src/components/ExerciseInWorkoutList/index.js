import React from "react";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../../utils/actions';
import Auth from '../../utils/auth'
import { REMOVE_EXERCISE } from '../../utils/mutations'
import { useMutation } from '@apollo/react-hooks';

function ExerciseInWorkoutList(props) {
  console.log('PROPS', props.state.currentWorkout.exercises);
  const [removeExercise, {error}] = useMutation(REMOVE_EXERCISE);
  const [state, dispatch] = useStoreContext();
  const handleDeleteExercise = async (exerciseId, workoutId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeExercise({
      variables: {exerciseId, workoutId }
      });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="my-2">
      <div className="flex-row">
        {props.state.currentWorkout.exercises.map(exercise => (
          <p className="workout-text"><span style={{fontWeight: "bolder"}}>{exercise.name} -</span>
            {exercise.distance ? (<span > Distance: {exercise.distance}</span>) : ''}
            {exercise.time ? (<span> Time: {exercise.time}sec</span>) : ''}
            {exercise.reps ? (<span> Reps: {exercise.reps}</span>) : ''}
            {exercise.weight ? (<span> Weight: {exercise.weight}lbs</span>) : ''}
            <button onClick={() => {
              console.log("i am at delete button")
              console.log(exercise)
            handleDeleteExercise(exercise._id, props.state.currentWorkout._id)
          }}>X</button>          
          </p>

        ))}
      </div>
    </div>
  )
}

export default ExerciseInWorkoutList;