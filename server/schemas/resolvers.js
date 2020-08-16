const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, WorkoutCategory, WorkoutRoutine, IndividualExercise } = require('../models');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const moment = require('moment');

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
    saveRoutine: async (parent, args, context) => {
      // if (context.user) {
        // const currentDay = moment(Date.now()).format("MMM Do YY");

        const workoutId = '5f3998ae358d0a82401181a3';
        const userId = '5f3997dc11102376bc20ab3e';

        const isWorkout = await WorkoutRoutine.findById(workoutId);
        console.log('isWorkout', isWorkout);
        // const isWorkout = await WorkoutRoutine.findById({_id: args.workoutId});
        if (isWorkout !== null) {
          const workout  = await WorkoutRoutine.findByIdAndUpdate(
            { _id: workoutId }, 
            { 
            $addToSet: 
              { exercises: [{
                  name: "Plank",
                  description: "Lay face down with elbows holding you up. Keep core engaged.",
                  videoLink: "https://www.youtube.com/watch?v=rxD321l2svE",
                  time: 90,
                  trackTime: true,
                  distance: null,
                  trackDistance: false,
                  weight: null,
                  trackWeight: false,
                  reps: null,
                  trackReps: false,
                  workoutCategory: {
                    _id: "5f387b95c603640cbc8e0e65",
                    name: "Core"
                    }
                },
                {
                  name: "Plank",
                  description: "Lay face down with elbows holding you up. Keep core engaged.",
                  videoLink: "https://www.youtube.com/watch?v=rxD321l2svE",
                  time: 90,
                  trackTime: true,
                  distance: null,
                  trackDistance: false,
                  weight: null,
                  trackWeight: false,
                  reps: null,
                  trackReps: false,
                  workoutCategory: {
                    _id: "5f387b95c603640cbc8e0e65",
                    name: "Core"
                    }
                }]
              }
            },
            { new: true, upsert: true }
          );
          console.log(workout);

          const workoutRemove = await User.findByIdAndUpdate(
            { _id: userId },
            { $pull: { workouts: { _id: workoutId }}},
            // { new: true }
          );
          
          console.log(workoutRemove);
          const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $addToSet: { workouts: workout }},
            { 
              new: true, 
              upsert: true }
          );
          // const user = await User.findByIdAndUpdate(
          //   { _id: userId }, 
          //   {$addToSet: { workouts: workout }},
          //   {returnOriginal: false, overwrite: true},
          //   function(err, res) {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log(res);
          //     }
          //   }
          // );
          console.log(user);
          return user;
        } else if (isWorkout === null) {
          const workout  = await WorkoutRoutine.create(
            { exercises: {
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
                  _id: "5f387b95c603640cbc8e0e63",
                  name: "Chest"
                  }
              }
            }
          );
          const user = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { workouts: workout }}, {new: true});
          console.log(user);
          return user;
        }
        // .populate('workoutCategory');
        // const routine = await WorkoutRoutine.create(workout)
        // .populate('exercises');
        // const user = await User.findByIdAndUpdate("5f3875cb0bf1e60f78c3a08e", { $push: { workouts: workout }}, {new: true});

        // return user;
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
