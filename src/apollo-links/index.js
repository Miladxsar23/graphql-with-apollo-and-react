import { HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
const GITHUB_BASE_URL = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});
const errorLink = onError(({ graphQlErrors, networkError }) => {
  if (graphQlErrors) {
    graphQlErrors.forEach(({ message, location, path }) => {
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
const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: Date.now() });
  console.log(operation.getContext())
  return forward(operation);
});

export default httpLink;
export { errorLink, timeStartLink };