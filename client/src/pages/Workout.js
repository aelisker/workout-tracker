import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_ALL_EXERCISES } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ROUTINE } from '../utils/mutations';

import spinner from '../assets/spinner.gif'
import IndividualRoutineExercise from '../components/IndividualRoutineExercise';
import IndividualExercise from '../components/IndividualExercise';

import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import Button from 'react-bootstrap/Button'


function Workout() {
  const { loading, data } = useQuery(QUERY_ALL_EXERCISES);
  const exercises = data?.exercises || [];
  const [button, setButton] = useState('Select an Exercise');
  const [exerciseState, setExerciseState] = useState({
    _id: '', name: '', description: '', videoLink: '',
    trackDistance: '', trackTime: '', trackWeight: '', trackReps: ''
  });

  const addExercise = (exerciseName, event) => {
    setButton(exerciseName);
    const indEx = exercises.filter(exercise => exercise.name === exerciseName);
    setExerciseState(
      {
        _id: indEx[0]._id, name: indEx[0].name, description: indEx[0].description, videoLink: indEx[0].videoLink,
        trackDistance: indEx[0].trackDistance, trackTime: indEx[0].trackTime, trackWeight: indEx[0].trackWeight, trackReps: indEx[0].trackWeight
      }
    );
    console.log(indEx[0]);
    console.log(exerciseState);
  };

  return (
    <>
      <div>
        <DropdownButton title={button} onSelect={function (evt) { 
            // setButton(evt)
            addExercise(evt) 
          }}>
          {exercises.map(exercise => (
            <MenuItem key={exercise._id} eventKey={exercise.name}>{exercise.name}</MenuItem>
          ))}
        </DropdownButton>
      </div>
      {/* <Button
        variant="outline-primary"
        onClick={() => {
          addExercise(button)
        }
        }>Add Selected Exercise</Button>{' '} */}


      {exerciseState.name ? (
      <IndividualRoutineExercise
        key={exerciseState._id}
        name={exerciseState.name}
        description={exerciseState.description}
        videoLink={exerciseState.videoLink}
        trackReps={exerciseState.trackReps}
        trackWeight={exerciseState.trackWeight}
        trackDistance={exerciseState.trackDistance}
        trackTime={exerciseState.trackTime}
      />
      ) : ''}
    </>
  )
}

export default Workout;