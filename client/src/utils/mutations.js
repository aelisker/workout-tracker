import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const SAVE_ROUTINE = gql`
mutation  saveRoutine($input: [exerciseInput], $name2: String, $description2:String, $videoLink2: String, $trackReps2: Boolean, $trackWeight2:Boolean, $trackDistance2: Boolean, $trackTime2:Boolean, $workoutId: ID){
  saveRoutine(input: $input,  name2: $name2, description2: $description2, videoLink2: $videoLink2, trackReps2: $trackReps2, trackWeight2: $trackWeight2, trackDistance2: $trackDistance2, trackTime2: $trackTime2, workoutId: $workoutId ){

_id
username
email
workouts {
_id
workoutDate
exercises {
_id
name
description
videoLink
trackReps
trackWeight
trackDistance
trackTime
trackTime

reps

weight

distance

time
workoutCategory {
  _id
  name
        }
      }
    }
  }
}
`;