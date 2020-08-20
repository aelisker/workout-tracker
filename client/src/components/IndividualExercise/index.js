import React from "react";
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';

function IndividualExercise(exercise) {
  const {
    _id,
    name,
    description,
    videoLink,
    workoutCategory,
    imageName
  } = exercise;
  console.log(imageName);

  return (

    <div className="col-6 mb-3 align-items-stretch">
      {/* <img src= {require(`../../assets/img/${imageName}`)}/> */}
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Img variant="top" src={require(`../../assets/img/${imageName}`)}/>
        <Card.Body>
          <Link to={`/exercise/${_id}`}>
            <Card.Title>{name}</Card.Title>
          </Link>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">{workoutCategory}</small>
        </Card.Footer> */}
      </Card>
    </div>
    // <div className="card px-1 py-1">
    //   <Link to={`/exercise/${_id}`}>
    //     {/* <img
    //       alt={name}
    //       src={`/images/${image}`}
    //     /> */}
    //     <p>{name}</p>
    //     <p>{description}</p>
    //   </Link>
    // </div>
  );
}

export default IndividualExercise;