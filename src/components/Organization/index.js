import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import RepositoryList from "../Repository";
import { REPOSITORY_FRAGMENT } from "../Repository";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading";
// graphQL documents
const GET_REPOSITORY_OF_ORGANIZATION = gql`
  query GetRepositoryFromOrganization(
    $organizationName: String!
    $cursor: String
  ) {
    organization(login: $organizationName) {
        id
      repositories(first: 5, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
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

function Organization({ organizationName }) {
  const { data, error, fetchMore, loading } = useQuery(
    GET_REPOSITORY_OF_ORGANIZATION,
    {
      variables: {
        organizationName,
      },
      skip: organizationName === "",
      notifyOnNetworkStatusChange: true,
    }
  );
  if (loading && !data?.organization) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="Profile row pt-3">
      <div className="Profile_info col-md-3 col-sm-12"></div>
      <div className="Profile_repositories col-md-9 col-sm-12">
        <RepositoryList
          repositories={data.organization.repositories}
          fetchMore={fetchMore}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default React.memo(Organization);
