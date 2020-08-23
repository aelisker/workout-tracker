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
mutation saveRoutine($input: [exerciseInput], $workoutId: ID) {
  saveRoutine(input: $input, workoutId: $workoutId ) {
    _id
    workoutDate
    exercises {
      _id
      name
      description
      videoLink
      weight
      reps
      distance
      time
    }
  }
}`;

export const REMOVE_EXERCISE = gql`
mutation removeExercise($exerciseId: ID!, $workoutId: ID!) {
  removeExercise(exerciseId: $exerciseId, workoutId:$workoutId) {
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
      reps
      weight
      distance
      time
    }
  }

  }
}
`;

export const UPDATE_EXERCISE = gql`
mutation updateExercise($exerciseId: ID!, $workoutId: ID!, $input: exerciseInput ) {
  updateExercise(exerciseId: $exerciseId, workoutId:$workoutId, input: $input ) {
      _id   
        workouts{
        _id
            exercises {
              _id
              name
              description
              videoLink
              trackReps
              trackTime
              trackWeight
              trackDistance
              reps
              weight
              distance
              time

        }
      }
  } 
}
`;