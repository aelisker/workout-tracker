const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, WorkoutCategory, WorkoutRoutine, IndividualExercise } = require('../models');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return await User.find();
    }
  },

  Mutation: {
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
