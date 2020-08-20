import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_EXERCISE } from '../utils/queries';
import spinner from '../assets/spinner.gif'

function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_EXERCISE, {
    variables: { _id: id }
  });
  const exercise = data?.exercise || [];

  return (
    <>
      {exercise ? (
        <div className="container justify-content-center">
          <div className="justify-content-center my-1">
            <Link 
              to="/list"
              className="mb-3">
              ← Back to Exercise List
            </Link>

            <h2>
              {exercise.name} - 
              <small className="mb-3">
              {' '}{exercise.workoutCategory ? exercise.workoutCategory.name : null}
            </small>
            </h2>

            <p className="mt-3">
              {exercise.description}
            </p>

            <iframe 
              width="560" 
              height="315" 
              src={`https://www.youtube.com/embed/${exercise.videoLink}`} 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>

          </div>
        </div>

      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
}

export default Detail;