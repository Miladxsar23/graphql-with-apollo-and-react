import { HttpLink } from "@apollo/client";
const GITHUB_BASE_URL = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export default httpLink;
