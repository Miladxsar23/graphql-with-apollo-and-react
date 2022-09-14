import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import RepositoryList from "../Repository";
import { REPOSITORY_FRAGMENT } from "../Repository";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading";
import { useSearchParams } from "react-router-dom";
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

function Organization() {
  const [searchParams, setSearchParams] = useSearchParams();
  const organizationName = searchParams.get("organization") || "";
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
    <>
      {data ? (
        <div className="Profile row pt-3">
          <div className="Profile_info col-md-3 d-none d-lg-block"></div>
          <div className="Profile_repositories col-md-9 col-sm-12">
            <RepositoryList
              repositories={data.organization.repositories || {}}
              fetchMore={fetchMore}
              loading={loading}
            />
          </div>
        </div>
      ) : <div className="d-flex justify-content-center align-items-center vh-100">please search a organiation...</div>}
    </>
  );
}

export default React.memo(Organization);
