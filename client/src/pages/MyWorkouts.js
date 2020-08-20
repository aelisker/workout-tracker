import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

function MyWorkouts () {
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || [];
  console.log(user);

  return (
    <>
      {user.workouts ? (
          <div className="flex-row">
              {user.workouts.map(workout => (
                <div key={workout._id}>
                  <p>Workout ID: {workout._id}</p>
                  <p>Workout Date: {workout.workoutDate}</p>
                  <p>Exercises: {workout.exercises.map(exercise => (
                    <ul>
                      <li>{exercise.name}</li>
                      {exercise.weight ? (<li>Weight: {exercise.weight}</li>) : ''}
                      {exercise.reps ? (<li>Reps: {exercise.reps}</li>) : ''}
                      {exercise.time ? (<li>Time: {exercise.time}</li>) : ''}
                      {exercise.distance ? (<li>Distance: {exercise.distance}</li>) : ''}
                    </ul>
                  ))}</p>
                </div>
              ))}
          </div>
        ) : (
          <h3>No Workouts Found</h3>
        )}
    </>
  );
};

export default MyWorkouts;