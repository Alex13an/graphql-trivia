import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "graphql-import-node";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

interface MyContext {
  req: express.Request;
  res: express.Response;
}

(async () => {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use("/", cors<cors.CorsRequest>({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
    app.use("/", bodyParser.json());
    app.use("/", cookieParser());
    app.use(
      "/",
      expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }),
      })
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: process.env.HOST_PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
  } catch (err) {
    console.log(err);
  }
})();
