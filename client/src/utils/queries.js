import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
    _id
    name
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