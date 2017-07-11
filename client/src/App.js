import React, { Component } from 'react';
import './App.css';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import Fortune from "./Fortune";

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql',
  opts: {
          mode: 'no-cors',
      }
});

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Fortune />
      </ApolloProvider>
    );
  }
}

export default App;
