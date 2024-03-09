import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typeDefs = mergeTypeDefs(loadFilesSync("./**/*.graphql"));

export default typeDefs;