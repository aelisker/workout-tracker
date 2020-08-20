import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import moment from 'moment';
//import { QUERY_USER } from '../utils/queries';
//import { useQuery } from '@apollo/react-hooks';
//import interactionPlugin from "@fullcalendar/interaction";



export default class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    )
  }
}


// function renderWorkoutData() {
//   const { loading, data } = useQuery(QUERY_USER);
//   const user = data?.user || [];
//   return (
//     <>
//       {user.length ? (
//             <div className="flex-row">
//               {user[0].workouts.map(workout => (
//                 <>
//                   <p>Workout ID: {workout._id}</p>
//                   <p> Workout Date: {workout.workoutDate}</p>
//                   <p>Exercises: {workout.exercises.map(exercise => (
//                     <ul>
//                       <li>{exercise.name}</li>
//                       {exercise.weight ? (<li>Weight: {exercise.weight}</li>) : ''}
//                       {exercise.reps ? (<li>Reps: {exercise.reps}</li>) : ''}
//                       {exercise.time ? (<li>Time: {exercise.time}</li>) : ''}
//                       {exercise.distance ? (<li>Distance: {exercise.distance}</li>) : ''}
//                     </ul>
//                   ))}</p>
//                 </>
//               ))}
//             </div>
//           ) : (
//               <h3>No Workouts Found</h3>
//             )}
//     </>
//   )
// }

