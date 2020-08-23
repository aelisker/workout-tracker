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
    user: async (parent, args, context) => {
      return await User.findById({ _id: context.user._id });
    },

    users: async () => {
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
      console.log('USER CONTEXT', context.user);
      console.log('ARGS', args);
      if (context.user) {
        const isWorkout = await WorkoutRoutine.findById(args.workoutId);
        // if workout exists, update workout
        if (isWorkout !== null) {
          const workout  = await WorkoutRoutine.findByIdAndUpdate(
            { _id: args.workoutId }, 
            { $addToSet: { exercises: args.input }},
            { new: true, upsert: true }
          );
          // update was creating duplicates. instead, pull existing workout with matching ID
          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { workouts: { _id: args.workoutId }}},
            // { new: true }
          );
          // add updated routine to user workout array
          await User.findByIdAndUpdate(context.user._id, { $addToSet: { workouts: workout }}, { new: true, upsert: true });
          return workout;

          // if no workout routine with queried ID, create new one
        } else if (isWorkout === null) {
          const workout  = await WorkoutRoutine.create(
            { exercises: args.input }
          );
          await User.findByIdAndUpdate(context.user._id, { $addToSet: { workouts: workout }}, {new: true});
          return workout;
        }
      } throw new AuthenticationError('Not logged in');
    },

    addUser: async (parent, args) => {
      console.log('ARGS', args)
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
    },
    removeExercise: async (parent, args, context) => {
      console.log("i am at line 61")


    const workout  = await WorkoutRoutine.findByIdAndUpdate(
      { _id: args.workoutId }, 
      { $pull: { exercises:{_id: args.exerciseId }}},
      { new: true }
    );
    console.log("i am at workout")
    console.log(workout)
    await User.findByIdAndUpdate(
            context.user._id ,
            { $pull: { workouts: { _id: args.workoutId }}},
          );
    await User.findByIdAndUpdate(
      context.user._id, 
      { $addToSet: { workouts: workout }}, 
      { new: true, upsert: true });
    console.log("i am at exercise length")
    console.log(workout.exercises) 
    if(workout.exercises.length == 0) {
      // const workout2 =  await WorkoutRoutine.findByIdAndDelete(
      //     {_id: context.user._id},
      //     {workouts:{_id: args.workoutId}},
      //   );
      console.log("i am at empty exercise")
        await User.findByIdAndUpdate(
          {_id: context.user._id},
          { $pull: { workouts: {_id: args.workoutId}}},
        )
      }
  },
      updateExercise: async (parent, args, context) => {
        const workout  = await WorkoutRoutine.findByIdAndUpdate(
          { _id: args.workoutId }, 
          { $pull: { exercises:{_id: args.exerciseId }}},
          { new: true }
        );
        await User.findByIdAndUpdate(
          context.user._id ,
          { $pull: { workouts: { _id: args.workoutId }}},
        );
        await User.findByIdAndUpdate(
          context.user._id, 
          { $addToSet: { workouts: workout }}, 
          { new: true, upsert: true });

          if (context.user) {
            const isWorkout = await WorkoutRoutine.findById(args.workoutId);
            // if workout exists, update workout
            if (isWorkout !== null) {
              const workout  = await WorkoutRoutine.findByIdAndUpdate(
                { _id: args.workoutId }, 
                { $addToSet: { exercises: args.input }},
                { new: true, upsert: true }
              );
              // update was creating duplicates. instead, pull existing workout with matching ID
              await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { workouts: { _id: args.workoutId }}},
                // { new: true }
              );
              // add updated routine to user workout array
              await User.findByIdAndUpdate(context.user._id, { $addToSet: { workouts: workout }}, { new: true, upsert: true });
              return workout;
    
              // if no workout routine with queried ID, create new one
            } else if (isWorkout === null) {
              const workout  = await WorkoutRoutine.create(
                { exercises: args.input }
              );
              await User.findByIdAndUpdate(context.user._id, { $addToSet: { workouts: workout }}, {new: true});
              return workout;
            }
          } throw new AuthenticationError('Not logged in');

      }

}
};

module.exports = resolvers;
