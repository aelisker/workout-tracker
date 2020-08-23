import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../utils/actions';
import { Link } from "react-router-dom";

import FullCalendar, { elementClosest } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
//import interactionPlugin from "@fullcalendar/interaction";

import moment from 'moment';

function MyWorkouts() {
  const { loading, data } = useQuery(QUERY_USER);
  const [state, dispatch] = useStoreContext();
  const user = data?.user || [];
  console.log(user);

  let workoutArr = [];
  if (user.workouts) {
    workoutArr = user.workouts.map(workout =>
      ({ title: workout._id, date: moment(workout.workoutDate).format("YYYY-MM-DD"), id: workout._id }));
    console.log(workoutArr);
  };

  useEffect(()=>{},[state])

  async function handleEventClick(id) {
    handleShow();
    const test = user.workouts.filter(workout => {
      return workout._id === id;
    });
    await dispatch({
      type: UPDATE_CURRENT_WORKOUT,
      workout: test[0]
    })
    console.log(state);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


  return (
    <>
    {show ? (
    <Modal.Dialog>
      {state.currentWorkout.exercises !== undefined ? (
        <>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
          </p>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Link to={`/edit/${state.currentWorkout._id}`}>
          <Button variant="primary">Update Workout</Button>
        </Link>
      </Modal.Footer>
      </>
      ) : ''} 
    </Modal.Dialog>
    ) : ''}
    <div className="mx-4 mt-3">
      {workoutArr.length ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={workoutArr}
          eventClick={function(info){
            alert('Event:' + info.event.id);
            handleEventClick(info.event.id);
          }}
        />) : (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
          />
        )}
    </div>
    </>
  );

};

export default MyWorkouts;