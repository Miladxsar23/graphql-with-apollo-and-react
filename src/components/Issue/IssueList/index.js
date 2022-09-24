import * as React from "react";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import FetchMore from "../../FetchMore";
import Spinner from "../../Spinner";
import ErrorMessage from "../../Error/ErrorMessage";
import IssueItem from "../IssueItem";
import "./index.scss";
import { ButtonUnobtrusive } from "../../Button";

// graphQL documents
const GET_ISSUES_FROM_REPOSITORY = gql`
  query GetIssuesFromRepository(
    $repositoryName: String!
    $repositoryOwner: String!
    $issueState: IssueState!
    $cursor: String
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      id
      issues(last: 5, states: [$issueState], after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
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
// Constants & Helpers
const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSE: "CLOSED",
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: "Show open issues",
  [ISSUE_STATES.OPEN]: "Show closed issues",
  [ISSUE_STATES.CLOSE]: "Hide Issues",
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSE,
  [ISSUE_STATES.CLOSE]: ISSUE_STATES.NONE,
};

const isShow = (issueState) => {
  return issueState !== ISSUE_STATES.NONE;
};
// Components
function Issues({ repositoryName, repositoryOwner }) {
  const [issueState, setIssueState] = React.useState(ISSUE_STATES.NONE);
  const { data, error, loading, fetchMore } = useQuery(
    GET_ISSUES_FROM_REPOSITORY,
    {
      variables: {
        repositoryName,
        repositoryOwner,
        issueState,
      },
      notifyOnNetworkStatusChange: true,
      skip : !isShow(issueState)
    }
  );
  if (error) return <ErrorMessage error={error} />;
  if (loading && !data?.repository) return <Spinner />;
  return (
    <>
      <div className="Issues_button w-100 d-block">
        <ButtonUnobtrusive
          onClick={() => setIssueState(TRANSITION_STATE[issueState])}
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>
      </div>
      {isShow(issueState) && (
        <>
          <IssueList issues={data.repository.issues} />
          <FetchMore
            fetchMore={fetchMore}
            loading={loading}
            hasNextPage={data.repository.issues.pageInfo.hasNextPage}
            variables={{ cursor: data.repository.issues.pageInfo.endCursor }}
          >
            more
          </FetchMore>
        </>
      )}
    </>
  );
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
