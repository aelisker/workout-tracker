const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type WorkoutCategory {
    _id: ID
    name: String
  }

  type IndividualExercise {
    _id: ID
    name: String
    description: String
    videoLink: String
    reps: Int
    trackReps: Boolean
    weight: Float
    trackWeight: Boolean
    distance: Float
    trackDistance: Boolean
    time: Float
    trackTime: Boolean
    workoutCategory: WorkoutCategory
  }

  type WorkoutRoutine {
    _id: ID
    # need to figure out how to add Date as type
    workoutDate: Date
    exercises: [IndividualExercise]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    workouts: [WorkoutRoutine]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: [User]
    exercises: [IndividualExercise]
    exercise(_id: ID!): IndividualExercise
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;