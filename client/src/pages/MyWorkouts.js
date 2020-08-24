import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../utils/actions';
import { Link } from "react-router-dom";
import { AddCommasAndAnAnd } from "../utils/helpers"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import moment from 'moment';

function MyWorkouts() {
  const { loading, data } = useQuery(QUERY_USER);
  const [state, dispatch] = useStoreContext();
  const user = data?.user || [];

  let workoutArr = [];
  if (user.workouts) {
    workoutArr = user.workouts.map(workout => {
      const nameArray = workout.exercises.map(exercise => (exercise.name));
      return ({ title: AddCommasAndAnAnd(nameArray), date: moment(workout.workoutDate).format("YYYY-MM-DD"), id: workout._id })
    })
  };

  useEffect(() => { }, [state]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleEventClick(id) {
    handleShow();
    const returnedWorkout = user.workouts.filter(workout => {
      return workout._id === id;
    });
    await dispatch({
      type: UPDATE_CURRENT_WORKOUT,
      workout: returnedWorkout[0]
    })
    console.log(state);
  }

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered
        className="workout-modal"
      >
        {state.currentWorkout.exercises !== undefined ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Your Workout</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {state.currentWorkout.exercises.map(exercise => (
                <p
                  className="workout-text"
                  key={exercise._id}
                >
                  <span style={{ fontWeight: "bolder" }}>{exercise.name} -</span>
                  {exercise.distance ? (<span > Distance: {exercise.distance}</span>) : ''}
                  {exercise.time ? (<span> Time: {exercise.time}sec</span>) : ''}
                  {exercise.reps ? (<span> Reps: {exercise.reps}</span>) : ''}
                  {exercise.weight ? (<span> Weight: {exercise.weight}lbs</span>) : ''}
                </p>
              ))}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Link to={`/workout/`}>
                <Button variant="primary">Update Workout</Button>
              </Link>
            </Modal.Footer>
          </>
        ) : ''}
      </Modal>

      <div className="mx-4 mt-3">
        {workoutArr.length ? (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={workoutArr}
            eventClick={function (info) {
              handleEventClick(info.event.id);
            }}
          />) : (
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
            />
          )}
      </div>
    </>
  );

};

export default MyWorkouts;