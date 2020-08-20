import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import moment from 'moment';
import Calendar from "../components/Calendar";
//import Calendar from '../components/Calendar';

function MyWorkouts() {
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || [];
  console.log(user);
  if (user.workouts){
  var dateChange = moment.unix(user.workouts.map(workout=>workout).workoutDate).format("YYYY/MM/DD");
  console.log(dateChange);
  }

  // var currentDate = new Date().moment.format("YYYY/MM/DD");
  // console.log(currentDate);

  //if (dateChange == currentDate) {
    return (
      <>
        <div>
          {user.length ? (
            <div className="flex-row">
              {user[0].workouts.map(workout => (
                <>
                  <p>Workout ID: {workout._id}</p>
                  <p> Workout Date: {workout.workoutDate}</p>
                  <p>Exercises: {workout.exercises.map(exercise => (
                    <ul>
                      <li>{exercise.name}</li>
                      {exercise.weight ? (<li>Weight: {exercise.weight}</li>) : ''}
                      {exercise.reps ? (<li>Reps: {exercise.reps}</li>) : ''}
                      {exercise.time ? (<li>Time: {exercise.time}</li>) : ''}
                      {exercise.distance ? (<li>Distance: {exercise.distance}</li>) : ''}
                    </ul>
                  ))}</p>
                </>
              ))}
            </div>
          ) : (
              <h3>No Workouts Found</h3>
            )}
        </div>
        <Calendar></Calendar>
      </>
    );
  //} else {
  //  return (
      //<>
        //<div>
        //  <p>You have no workout for this Date!</p>
        //</div>
     // </>
    //)
  //}
};

export default MyWorkouts;