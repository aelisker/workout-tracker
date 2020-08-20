import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import moment from 'moment';

function MyWorkouts() {
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || [];
  console.log(user);

  let workoutArr = [];
  if (user.workouts) {
    workoutArr = user.workouts.map(workout =>
      ({ title: workout._id, date: moment(workout.workoutDate).format("YYYY-MM-DD") }));
    console.log(workoutArr);
  };

  return (
    <>
      {workoutArr.length ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={workoutArr}
        />) : ''}
    </>
  );
};

export default MyWorkouts;