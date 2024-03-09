import { merge } from "lodash";
import queryResolvers from "./query.resolvers";
import discordResolvers from "./discord.resolvers";

const resolvers = merge(queryResolvers, discordResolvers);

export default resolvers;
