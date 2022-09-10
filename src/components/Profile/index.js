import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading";
import ErrorMessage from "../Error/ErrorMessage";
import RepositoryList from "../Repository";
import { REPOSITORY_FRAGMENT } from "../Repository";
import "./Profile.scss";
/////////////////////////////////documents//////////////////////////////////////
export const GET_REPOSITORY_OF_CURRENT_USER = gql`
  query getRepositoryOfCurrentUser($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
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
function Profile(props) {
  const { loading, error, fetchMore, data } = useQuery(
    GET_REPOSITORY_OF_CURRENT_USER,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  if (loading && !data?.viewer) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="Profile row pt-3">
      <div className="Profile_info col-md-3 col-sm-12"></div>
      <div className="Profile_repositories col-md-9 col-sm-12">
        <RepositoryList
          repositories={data.viewer.repositories}
          fetchMore={fetchMore}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default React.memo(Profile);
