import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers/index.resolvers";
import { SharedContext } from "./utils/context";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer<SharedContext>({ typeDefs, resolvers });
  const PORT = process.env.PORT || 4000;

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        client: req.headers["x-client-referer"],
      }),
    })
  );

  app.use("/static", express.static("./public/assets/flags"));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`); // Log the URL
  });
};

startServer();
