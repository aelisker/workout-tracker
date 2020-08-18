const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
<<<<<<< HEAD
  // typeDefs,
  // resolvers,
  // context: authMiddleware
=======
  typeDefs,
  resolvers,
  context: authMiddleware
>>>>>>> 7d3b9dac1db48f7f490788aca4dc2da5810b79a4
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
<<<<<<< HEAD
// app.use('/images', express.static(path.join(__dirname, '../client/images')));
=======
app.use('/images', express.static(path.join(__dirname, '../client/images')));
>>>>>>> 7d3b9dac1db48f7f490788aca4dc2da5810b79a4

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
