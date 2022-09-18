import * as React from "react";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../Loading";
import ErrorMessage from "../../Error/ErrorMessage";
import IssueItem from "../IssueItem";
import "./index.scss";
import { ButtonUnobtrusive } from "../../Button";

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
// Constants & Helpers
const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSE: "CLOSE",
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
  const skip = !isShow(issueState);
  const { data, error, loading } = useQuery(GET_ISSUES_FROM_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner,
    },
    skip
  });
  if (error) return <ErrorMessage error={error} />;
  if (loading && !data?.repository) return <Loading />;
  const filterIssues = data?.repository?.issues?.edges && {
    issues: {
      edges: data.repository.issues.edges.filter(
        (issue) => issue.node.state === issueState
      ),
    },
  };
  return (
    <>
      <div className="Issues_button w-100 d-block">
        <ButtonUnobtrusive
          onClick={() => setIssueState(TRANSITION_STATE[issueState])}
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>
      </div>
      {data && data.repository && filterIssues.issues.edges.length !== 0 ? (
        <IssueList issues={filterIssues.issues} />
      ) : (
        issueState !== ISSUE_STATES.NONE && <div>no issues....</div>
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
