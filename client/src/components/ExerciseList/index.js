import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import IndividualExercise from '../IndividualExercise';
import { QUERY_ALL_EXERCISES } from '../../utils/queries';

import CardDeck from 'react-bootstrap/CardDeck'
import spinner from "../../assets/spinner.gif"



function ExerciseList() {
  const { loading, data } = useQuery(QUERY_ALL_EXERCISES);

  const exercises = data?.exercises || [];

  return (
    <div className="my-2 mx-3">
      <h2>Available Exercises:</h2>
      <div className="row justify-content-center">
      {exercises.length ? (
        <CardDeck>

        {exercises.map(exercise => (
          <IndividualExercise
          key= {exercise._id}
          _id={exercise._id}
          name={exercise.name}
          description={exercise.description}
          videoLink={exercise.videoLink}
          imageName={exercise.imageName}
          />
          ))}
          </CardDeck>
          
      ) : (
        <h3>No exercises found. Has the DB been seeded?</h3>
      )}
      </div>
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  )
}

export default ExerciseList;