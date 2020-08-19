import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_EXERCISE } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ROUTINE } from '../utils/mutations';

import spinner from '../assets/spinner.gif'


function Detail() {
  const { id } = useParams();
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
        variables: { input: [
          { name: currentExercise.name, description: currentExercise.description, videoLink: currentExercise.videoLink, 
            trackReps: currentExercise.trackReps, trackWeight: currentExercise.trackWeight, 
            trackDistance: currentExercise.trackDistance, trackTime: currentExercise.trackTime,
            reps:  Number(formState.reps), weight: Number(formState.weight), 
            distance: Number(formState.distance), time: Number(formState.time) }] }
      })
      console.log('SUBMISSION', submit);
    } catch (error) {
      console.log(error);
    }
  }

  const [formState, setFormState] = useState({ time: 0, weight: 0, reps: 0, distance: 0 });
  const [workouts, setWorkouts] = useState([])
  const [count, setCount] = useState(0)

  const formFunction = () => {
        setCount(count + 1)
        setWorkouts([...workouts, { time: formState.time, weight: formState.weight, reps: formState.reps, distance: formState.distance }])
      }

  return (
    <>
      {currentExercise ? (
        <>
        <div className="container my-1">
          <Link to="/list">
            ← Back to Exercise List
          </Link>

          <h2>{currentExercise.name}</h2>

          <p>
            {currentExercise.description}
          </p>
          <p>
            {currentExercise.workoutCategory ? currentExercise.workoutCategory.name : null}
          </p>
        </div>

        <div key="div-container-dates" className="single-exercise ">

          <div key="exercise" className="d-flex justify-content-center">
            Exercise: {currentExercise.name}
          </div>

          {currentExercise.trackTime ? (
            <div key="div-container-timedata" className="d-flex justify-content-center"> Time (Minutes)
              <input key="time" className='form-input'
                placeholder='Number of Minutes'
                name='time'
                value={Number(formState.time).toString()}
                type='number'
                id='time'
                required
                onChange={(event) => {
                  const { name, value } = event.target;

                  setFormState({
                    ...formState,
                    [name]: value,
                  });
                }}>

              </input>
            </div>
          ) : null}

          {currentExercise.trackWeight ? (
            <div key="div-container-weight" className="d-flex justify-content-center"> Weight (lbs)
              <input key="weight" className='form-input'
                placeholder='weight'
                name='weight'
                type='number'
                value={Number(formState.weight).toString()}
                id='weight'
                required
                onChange={(event) => {
                  const { name, value } = event.target;
                  console.log({ name, value });

                  setFormState({
                    ...formState,
                    [name]: value,
                  });
                }}>

              </input>
            </div>
          ) : null}

          {currentExercise.trackReps ? (
            <div key="div-container-reps" className="d-flex justify-content-center"> Reps (Number)
              <input key="reps" className='form-input'
                placeholder='reps'
                name='reps'
                type='number'
                value={Number(formState.reps).toString()}
                id='reps'
                required
                onChange={(event) => {
                  const { name, value } = event.target;

                  setFormState({
                    ...formState,
                    [name]: value,
                  });
                }}>

              </input>
            </div>
          ) : null}

          {currentExercise.trackDistance ? (
            <div key="div-container-timedata" className="d-flex justify-content-center"> Distance (Miles)
              <input key="time" className='form-input'
                placeholder='Number of Miles'
                name='distance'
                type='number'
                value={Number(formState.distance).toString()}
                required
                id='distance'
                onChange={(event) => {
                  const { name, value } = event.target;

                  setFormState({
                    ...formState,
                    [name]: value,
                  });
                }}>

              </input>
            </div>
          ) : null}

          <div key="div-container-button" className="d-flex justify-content-center">
            <button onClick={() => {
              formFunction()
              setCount(count + 1)
              saveTheRoutine()
            }}>
              Submit Set
            </button>
          </div>
          {
            workouts.map(workout => {
              return (
              <div key="div-container-set">
                {currentExercise.trackTime ? <div key="time-div" className="d-flex justify-content-center">Time: {workout.time} minutes</div> : ''}
                {currentExercise.trackDistance ? <div key="distance-div" className="d-flex justify-content-center">Distance: {workout.distance} feet</div> : ''}
                {currentExercise.trackWeight ? <div key="weight-div" className="d-flex justify-content-center">Weight: {workout.weight} lbs</div> : ''}
                {currentExercise.trackReps ? <div key="reps-div" className="d-flex justify-content-center">Number of Reps: {workout.reps}</div> : ''}
                <br></br>
              </div>)
            })}
        </div>
        </>

        
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
  
    </>
  );
}

export default Detail;