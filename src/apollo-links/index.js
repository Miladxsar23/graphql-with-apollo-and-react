import { HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { stripIgnoredCharacters } from "graphql";
import { RetryLink } from "@apollo/client/link/retry";
const GITHUB_BASE_URL = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
  print(ast, orginalPrint) {
    return stripIgnoredCharacters(orginalPrint(ast));
  },
});
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authentication: localStorage.getItem("token"),
              },
            });
            return forward(operation);
          default:
            continue;
        }
      }
    }
    if (networkError) {
      console.log(`[Network Error] : ${networkError}`);
    }
  }
);
//retry link
const retryLink = new RetryLink();
//custom link
const roundTripLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation).map((response) => {
    const responseTime = new Date() - operation.getContext().start;
    return response;
  });
});

export default httpLink;
export { errorLink, roundTripLink, retryLink };
