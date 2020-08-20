import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

function MyWorkouts () {
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || [];
  console.log("i am at user")
  console.log(user)

const handleDeleteExercise = async (exerciseId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return false;
  }
}

  return (
    <>
      {user.workouts ? (
          <div className="flex-row">
              {user.workouts.map(workout => (
                <>
                <div key={workout._id}>
                  <p >Workout ID: {workout._id}</p>
                  <p key={workout.workoutDate}> Workout Date: {workout.workoutDate}</p>
                  <p >Exercises: {workout.exercises.map(exercise => (
                    <ul key = {exercise._id}>
                      <button onClick={() => handleDeleteExercise(exercise._id)}>Remove Exercise</button>
                      <li key={exercise.name}>{exercise.name}</li>           
                      {exercise.weight ? (<li key={exercise.weight}>Weight: {exercise.weight}</li>) : ''}
                      {exercise.reps ? (<li key={exercise.reps}>Reps: {exercise.reps}</li>) : ''}
                      {exercise.time ? (<li key={exercise.time}>Time: {exercise.time}</li>) : ''}
                      {exercise.distance ? (<li key={exercise.distance}>Distance: {exercise.distance}</li>) : ''}
                    </ul>
                  ))}</p>
                  </div>
                </>
              ))}
          </div>
        ) : (
          <h3>No Workouts Found</h3>
        )}
    </>
  );
};

export default MyWorkouts;