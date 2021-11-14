import {
  DocumentNode,
  GraphQLSchema
} from 'graphql';
import { Parser, ParserArguments } from './classes/Parser';

interface Schema {
  source: string;
  document: DocumentNode;
  schema: GraphQLSchema;
  arguments?: ParserArguments;
}

export async function handler({ document, arguments: args }: Schema) {
  return Parser.parse(document, args);
}
