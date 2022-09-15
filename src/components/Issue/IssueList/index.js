import * as React from "react";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../Loading";
import ErrorMessage from "../../Error/ErrorMessage";
import IssueItem from "../IssueItem";
import "./index.scss";

// graphQL documents
const GET_ISSUES_FROM_REPOSITORY = gql`
  query GetIssuesFromRepository(
    $repositoryName: String!
    $repositoryOwner: String!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;
function Issues({ repositoryName, repositoryOwner }) {
  const { data, error, loading } = useQuery(GET_ISSUES_FROM_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner,
    },
  });
  if (error) return <ErrorMessage error={error} />;
  if (loading && !data?.repository) return <Loading />;
  const { repository } = data;
  if (!repository.issues.edges.length) {
    return <div>no issues ...</div>;
  }
  return <IssueList issues={repository.issues} />;
}

function IssueList({ issues }) {
  const issuesListEL = useMemo(() => {
    return issues.edges.map(({ node }) => {
      return <IssueItem key={node.id} {...node} />;
    });
  }, [issues]);
  return <div className="IssueList">{issuesListEL}</div>;
}

export default React.memo(Issues);
