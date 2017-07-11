import React from 'react';

import { gql, graphql} from 'react-apollo';


// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
export const Fortune = ({ data: { loading, fortune, error } }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return <h1>FORTUNE</h1>;
};

export const FORTUNE_QUERY = gql`
  query {getFortuneCookie}
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (Pokemon here)
export const withFortune = graphql(FORTUNE_QUERY);

export default withFortune(Fortune);
