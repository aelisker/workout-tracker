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
      }
    }
  }
}
`;

export const QUERY_EXERCISE = gql`
  query exercise($_id: ID!) {
    exercise(_id: $_id) {
      _id
      name
      description
      videoLink
      imageName
      trackReps
      trackWeight
      trackDistance
      trackTime
      workoutCategory {
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_EXERCISES = gql`
  {
    exercises {
      _id
        name
        description
        videoLink
        imageName
        trackReps
        trackWeight
        trackDistance
        trackTime
        workoutCategory {
          _id
          name
        }
    }
  }
`;