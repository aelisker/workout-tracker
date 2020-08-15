import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_EXERCISE } from '../utils/queries';
import spinner from '../assets/spinner.gif'

function Detail() {
  const { id } = useParams();
  const [currentExercise, setCurrentExercise] = useState({});
  const { loading, data } = useQuery(QUERY_EXERCISE, {
    variables: { _id: id }
  });
  const exercise = data?.exercise || [];
  console.log(exercise);

  useEffect(() => {
    setCurrentExercise(exercise);
  }, [exercise, id]);


  console.log(currentExercise)

  return (
    <>
      {currentExercise ? (
        <div className="container my-1">
          <Link to="/list">
            ← Back to Exercise List
          </Link>

          <h2>{currentExercise.name}</h2>

          <p>
            {currentExercise.description}
          </p>
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
}

export default Detail;