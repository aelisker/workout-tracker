import React from "react";
import { Link } from "react-router-dom";

function IndividualExercise(exercise) {
  const {
    _id,
    name,
    description,
    videoLink
  } = exercise;
console.log("i am at individ exercise")
console.log(_id)
  return (
    <div className="card px-1 py-1">
      <Link to={`/exercise/${_id}`}>
        {/* <img
          alt={name}
          src={`/images/${image}`}
        /> */}
        <p>{name}</p>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default IndividualExercise;