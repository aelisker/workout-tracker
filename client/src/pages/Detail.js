import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_EXERCISE } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ROUTINE } from '../utils/mutations';

import spinner from '../assets/spinner.gif'

function Detail() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [currentExercise, setCurrentExercise] = useState({});
  const { loading, data } = useQuery(QUERY_EXERCISE, {
    variables: { _id: id }
  });
  const exercise = data?.exercise || [];

  useEffect(() => {
    setCurrentExercise(exercise, exercise.workoutCategory);
  }, [exercise, id]);

  const [saveRoutine, { error }] = useMutation(SAVE_ROUTINE);

  console.log('currentExercise', currentExercise)
  console.log('currentExercise.workoutCategory', currentExercise.workoutCategory);

  const saveTheRoutine = async event => {
    // event.preventDefault();
    try {
      const submit = await saveRoutine({
        variables: {
          workoutId: formState.workoutId, input: [
            {
              name: currentExercise.name, description: currentExercise.description, videoLink: currentExercise.videoLink,
              trackReps: currentExercise.trackReps, trackWeight: currentExercise.trackWeight,
              trackDistance: currentExercise.trackDistance, trackTime: currentExercise.trackTime,
              reps: Number(formState.reps), weight: Number(formState.weight),
              distance: Number(formState.distance), time: Number(formState.time)
            }]
        }
      })
      setFormState({
        ...formState,
        workoutId: submit.data.saveRoutine._id.toString(),
      });
      console.log('WORKOUT ID', formState.workoutId);

    } catch (error) {
      console.log(error);
    }
  }

  const [formState, setFormState] = useState({ time: 0, weight: 0, reps: 0, distance: 0, workoutId: null });
  const [workouts, setWorkouts] = useState([])
  // const [count, setCount] = useState(0)

  const formFunction = () => {
    // setCount(count + 1)
    setWorkouts([...workouts, { time: formState.time, weight: formState.weight, reps: formState.reps, distance: formState.distance }])
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
      if (e.target.name === 'time' || e.target.name === 'weight' || e.target.name === 'reps' || e.target.name === 'distance' ) {
        if(e.target.value === '' || e.target.value === "0") {
          setErrorMessage(e.target.name.toUpperCase() + ' field is required')
        } else {
          setErrorMessage('')
        }
      }
      
      if (!errorMessage) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      }
    console.log('errorMessage', errorMessage);
  }

  return (
    <>
      {currentExercise ? (
        <div>
          <div className="container my-1">
            <Link 
              to="/list"
              className="mb-3">
              ← Back to Exercise List
            </Link>

            <h2>
              {currentExercise.name} - 
              <small className="mb-3">
              {' '}{currentExercise.workoutCategory ? currentExercise.workoutCategory.name : null}
            </small>
            </h2>

            <p className="mt-3">
              {currentExercise.description}
            </p>
          </div>
        </div>

      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
}

export default Detail;