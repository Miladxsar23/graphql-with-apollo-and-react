import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading";
import ErrorMessage from "../Error/ErrorMessage";
import RepositoryList from "../Repository";
/////////////////////////////////Queries//////////////////////////////////////
const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const GET_REPOSITORY_OF_CURRENT_USER = gql`
  query getRepositoryOfCurrentUser{
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

///////////////////////////////Viiew Layer<Component>//////////////////////////////
const Profile = (props) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY_OF_CURRENT_USER);
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="Profile">
      <RepositoryList repositories={data.viewer.repositories} />
    </div>
  );
};

export default Profile;
