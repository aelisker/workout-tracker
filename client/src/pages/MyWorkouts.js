import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../utils/actions';
import { Link } from "react-router-dom";
import { ModalHeader2 } from "../utils/helpers"
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

  let workoutArr = [];
  if (user.workouts) {
    workoutArr = user.workouts.map(workout =>
      ({ title: workout._id, date: moment(workout.workoutDate).format("YYYY-MM-DD"), id: workout._id })
      );
    console.log(workoutArr);

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

let ModalArray = []
let ModalArray3 = ""
if(state){
  console.log("i am at state")
  console.log(state)
}
// state.currentWorkout.exercises.map(exercise => {
// ModalArray.push(exercise.name)

// })


let test = ["Chinups", "Chinups", "Pullups", "Pullups", "Situps", "Situps"]
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
           { console.log("i am at state2"),
            console.log(state.currentWorkout.exercises),
            state.currentWorkout.exercises.map(exercise => (
              ModalArray.concat(exercise.name),
              ModalArray3 = ModalHeader2(test)
            ))
            }
              <Modal.Title>{ModalArray}</Modal.Title>
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
              weekends={false}
            />
          )}
      </div>
    </>
  );

};

export default MyWorkouts;