import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

import cors from 'cors';

import path from 'path';

const GRAPHQL_PORT = 3001;

const graphQLServer = express();

const corsOptions = {
  origin(origin, callback)
  {
    callback(null, true);
  },
  credentials: true
};
graphQLServer.use(cors(corsOptions));

var allowCrossDomain = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
}
graphQLServer.use(allowCrossDomain);
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
