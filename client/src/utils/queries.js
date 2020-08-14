import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
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
        workoutCategory
      }
    }
  }
}
`;

export const QUERY_ALL_EXERCISES = gql`
  {
    exercies {
      _id
        name
        description
        videoLink
        reps
        weight
        distance
        time
        workoutCategory
    }
  }
`;