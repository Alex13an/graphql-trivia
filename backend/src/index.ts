import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'graphql-import-node';
import dotenv from 'dotenv';
dotenv.config();
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    const { url } = await startStandaloneServer(server, {

      listen: { port: 4000 },

      // context: async ({ req, res }) => {
      //   // const token = req.headers.authorization || '';
      //   // const user = await getUser(token);
      //   const user = {};
      //   return { user };
      // },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (err) {
    console.log(err);
  }
})()
