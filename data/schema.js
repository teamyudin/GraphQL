import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import mocks from './mocks'

const typeDefs = `

type Author{
  firstName: String
  lastName: String
  posts: [Post]
}

type Post{
  title: String
  text: String
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;
