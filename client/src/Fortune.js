import React from 'react';
import { gql, graphql} from 'react-apollo';

export const Fortune = ({ data: { loading, fortune, error } }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return (
    <div>
    Fortune:
      {
        fortune
      }
    </div>
  )
};

export const FORTUNE_QUERY = gql`
  query {getFortuneCookie}
`;

export const withFortune = graphql(FORTUNE_QUERY);
export default withFortune(Fortune);
