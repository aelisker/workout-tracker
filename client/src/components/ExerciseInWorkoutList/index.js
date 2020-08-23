import React, { useEffect } from "react";
import Auth from '../../utils/auth'
import { REMOVE_EXERCISE } from '../../utils/mutations'
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CURRENT_WORKOUT } from '../../utils/actions';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function ExerciseInWorkoutList(props) {
  const [state, dispatch] = useStoreContext();
  const [removeExercise, {error}] = useMutation(REMOVE_EXERCISE);

  const handleModifyExercise = async (exerciseId, workoutId, exerciseName) => {
    state.currentId = exerciseId
    console.log(" i amm at exercise id")
    console.log(exerciseId)
    props.shouldComponentUpdate({id: exerciseId,shouldComponentUpdate:!props.currentWorkout, name: exerciseName  })

  
  }

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

 
            <div className="row">
             <Link to={`/edit-workout`}>
             <Button className="form-inline"  onClick={() => {
              handleModifyExercise(exercise._id, state.currentWorkout._id, exercise.name)
             
            }}    >Update</Button> 
              </Link>

            <button className="form-inline" onClick={() => {
              handleDeleteExercise(exercise._id, state.currentWorkout._id)
            }}>X</button>       
            </div>
          </p>
        ))}
      </div>
    </div>
  )
}

export default ExerciseInWorkoutList;