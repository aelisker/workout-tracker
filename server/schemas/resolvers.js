const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, WorkoutCategory, WorkoutRoutine, IndividualExercise } = require('../models');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolvers = {
  // Date information comes from https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    user: async () => {
      return await User.find({});
    },

    exercises: async () => {
      return await IndividualExercise.find({}).populate('workoutCategory');
    },

    exercise: async (parent, {_id}) => {
      return await IndividualExercise.findById(_id).populate('workoutCategory');
    }
  },

  Mutation: {
    // saveRoutine: async (parent, args, context) => {
    //   if (context.user) {
    //     const workout  = await IndividualExercise.create([args.exercises]).populate('workoutCategory');
    //     const routine = await WorkoutRoutine.create(workout).populate('exercises');
    //     const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { workoutRoutine: routine }});

    //     return user;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },

    saveRoutine: async (parent, args, context) => {
      // if (context.user) {
        // const isWorkout = await WorkoutRoutine.findById({_id: args.workoutId});
        // if (!isWorkout) {

        // }
        const workout  = await WorkoutRoutine.create(
          { exercises: [{
              name: "Bench Press",
              description: "Use a closed grip with a barbell to press upward from your chest.",
              videoLink: "https://www.youtube.com/watch?v=rxD321l2svE",
              time: null,
              trackTime: false,
              distance: null,
              trackDistance: false,
              weight: 100,
              trackWeight: true,
              reps: 10,
              trackReps: true,
              workoutCategory: {
                _id: "5f3845de3dc4d77e880bfdf4",
                name: "Chest"
                }
            }]
          }
        )
        // .populate('workoutCategory');
        // const routine = await WorkoutRoutine.create(workout)
        // .populate('exercises');
        const user = await User.findByIdAndUpdate("5f3869ff7083d66b5c736dd6", { $push: { workouts: workout }}, {new: true});

        return user;
      // }
      // throw new AuthenticationError('Not logged in');
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
