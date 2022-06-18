import { HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
const GITHUB_BASE_URL = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, location, path }) => {
      console.log(
        `[GraphQlErrors] : Message : ${message}, Location:${location}, Path:${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network Error] : ${networkError}`);
  }
});
//custom link
const roundTripLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation).map((data) => {
    const responseTime = new Date() - operation.getContext().start;
    console.log(responseTime);
    return data;
  });
});

export default httpLink;
export { errorLink, roundTripLink };
