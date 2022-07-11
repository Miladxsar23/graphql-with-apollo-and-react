import * as React from "react";
import { useQuery, gql, ApolloProvider } from "@apollo/client";
import Loading from "../Loading";
import ErrorMessage from "../Error/ErrorMessage";
import RepositoryList from "../Repository";
import { REPOSITORY_FRAGMENT } from "../Repository";
import "./Profile.scss";
/////////////////////////////////Queries//////////////////////////////////////
const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

export const GET_REPOSITORY_OF_CURRENT_USER = gql`
  query getRepositoryOfCurrentUser {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

///////////////////////////////Viiew Layer<Component>//////////////////////////////
const Profile = (props) => {
  const { loading, error, data, client } = useQuery(GET_REPOSITORY_OF_CURRENT_USER);
  console.log(client)
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="Profile row pt-3">
      <div className="Profile_info col-md-3 col-sm-12"></div>
      <div className="Profile_repositories col-md-9 col-sm-12">
        <RepositoryList repositories={data.viewer.repositories} />
      </div>
    </div>
  );
};

export default Profile;
