import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ROUTINE } from '../../utils/mutations';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../../utils/actions';

function IndividualRoutineExercise(props) {
  const {
    _id,
    name,
    description,
    videoLink,
    trackDistance,
    distance,
    trackTime,
    time,
    trackReps,
    reps,
    trackWeight,
    weight,
    workoutId
  } = props;

  const [state, dispatch] = useStoreContext();

  const [saveRoutine, { error }] = useMutation(SAVE_ROUTINE);

  const [formState, setFormState] = useState({
    name: name, description: description, videoLink: videoLink,
    trackDistance: trackDistance, trackTime: trackTime, trackWeight: trackWeight, trackReps: trackReps,
    time: 0, weight: 0, reps: 0, distance: 0, workoutId: null
  });
  const [workouts, setWorkouts] = useState([])

  useEffect(() => { }, [props]);

  const saveTheRoutine = async event => {
    // event.preventDefault();
    try {
      // call saveRoutine mutation, which either creates new workout or updates existing routine if _id finds match
      const submit = await saveRoutine({
        variables: {
          workoutId: state.currentWorkout._id, input: [
            {
              name: formState.name, description: formState.description, videoLink: formState.videoLink,
              trackReps: formState.trackReps, trackWeight: formState.trackWeight,
              trackDistance: formState.trackDistance, trackTime: formState.trackTime,
              reps: Number(formState.reps), weight: Number(formState.weight),
              distance: Number(formState.distance), time: Number(formState.time)
            }]
        }
      });

      // await return of workout from mutation and set as current workout in global state
      dispatch({
        type: UPDATE_CURRENT_WORKOUT,
        workout: submit.data.saveRoutine
      });

      // update workout id in formstate for updates
      setFormState({
        ...formState,
        workoutId: state._id
      });

    } catch (error) {
      console.log(error);
    }
  }

  const formFunction = () => {
    setWorkouts([...workouts, { time: formState.time, weight: formState.weight, reps: formState.reps, distance: formState.distance }])
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="my-3">
        <p>
          {description}
        </p>
      </div>

      <div key="div-container-dates" className="single-exercise" onSubmit={handleSubmit}>
        {trackTime ? (
          <div key="div-container-timedata" className="d-flex input-area">
            <div className="input-label">Time (Seconds)</div>
            <input key="time" className='form-input input-field'
              placeholder='Number of Minutes'
              name='time'
              // eliminates leading zeroes when typing
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

        {trackWeight ? (
          <div key="div-container-weight" className="d-flex input-area">
            <div className="input-label">Weight (lbs)</div>
            <input key="weight" className='form-input input-field'
              placeholder='weight'
              name='weight'
              type='number'
              value={Number(formState.weight).toString()}
              id='weight'
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

        {trackReps ? (
          <div key="div-container-reps" className="d-flex input-area">
            <div className="input-label">Reps (Number)</div>
            <input key="reps" className='form-input input-field'
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

        {trackDistance ? (
          <div key="div-container-timedata" className="d-flex">
            <div className="input-label">Distance (Miles)</div>
            <input key="time" className='form-input input-field'
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

        <div key="div-container-button" className="d-flex input-area">
          <button onClick={() => {
            formFunction()
            saveTheRoutine()
          }}>
            Submit Set
            </button>
        </div>
      </div>
    </>
  );
}

export default IndividualRoutineExercise;