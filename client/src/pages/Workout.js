import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_EXERCISES } from '../utils/queries';
import IndividualRoutineExercise from '../components/IndividualRoutineExercise';
import ExerciseInWorkoutList from '../components/ExerciseInWorkoutList';
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import { useStoreContext } from '../utils/GlobalState';

function Workout() {
  const [state] = useStoreContext();
  const {  data } = useQuery(QUERY_ALL_EXERCISES);
  const exercises = data?.exercises || [];
  const [button, setButton] = useState('Select an Exercise');
  const [exerciseState, setExerciseState] = useState({});

  const addExercise = async (exerciseName) => {
    setButton(exerciseName);
    const indEx = await exercises.filter(exercise => exercise.name === exerciseName);
    setExerciseState(
      {
        _id: indEx[0]._id, name: indEx[0].name, description: indEx[0].description, videoLink: indEx[0].videoLink,
        trackDistance: indEx[0].trackDistance, trackTime: indEx[0].trackTime, trackWeight: indEx[0].trackWeight, trackReps: indEx[0].trackReps
      }
    );
  };

  useEffect(() => {
    console.log('STATE from Workout useEffect', state)
  }, [exerciseState, state.currentWorkout])

  return (
    <div className="d-flex">
      <div className="col-5 workout-input">
        {typeof state.currentWorkout.exercises === 'undefined' ?
          (<h1>Add a Workout?</h1>) :
          (<h1>Current Workout</h1>)}
        <div>
          <DropdownButton title={button} onSelect={function (evt) {
            addExercise(evt)
          }}>
            {exercises.map(exercise => (
              <MenuItem 
                key={exercise._id} 
                eventKey={exercise.name}
              >{exercise.name}</MenuItem>
            ))}
          </DropdownButton>
        </div>

        {exerciseState.name ? (
          <IndividualRoutineExercise
            key={exerciseState._id}
            _id={exerciseState._id}
            name={exerciseState.name}
            description={exerciseState.description}
            videoLink={exerciseState.videoLink}
            trackReps={exerciseState.trackReps}
            trackWeight={exerciseState.trackWeight}
            trackDistance={exerciseState.trackDistance}
            trackTime={exerciseState.trackTime}
          />
        ) : ''}
      </div>
      <div className="col-lg-3"></div>
        <div className="col-lg-4 col-7 mt-3 workout-output overflow-auto">
          {typeof state.currentWorkout.exercises !== 'undefined' ? (
            <ExerciseInWorkoutList
              shouldComponentUpdate={true}
            />) : ''}
        </div>
    </div>
  )
}

export default Workout;