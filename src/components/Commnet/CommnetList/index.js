import * as React from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import "./index.scss";
import Spinner from "../../Spinner";
import ErrorMessage from "../../Error/ErrorMessage";
import CommentAdd from "../CommentAdd";
import CommentItem from "../CommentItem";
import FetchMore from "../../FetchMore";

// query document
const GET_COMMENTS_FROM_ISSUE = gql`
  query GetCommentsFromIssue(
    $repositoryOwner: String!
    $repositoryName: String!
    $number: Int!
    $cursor: String
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $number) {
        id
        comments(first: 1, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              bodyHTML
              author {
                login
              }
              createdAt
            }
          }
        }
      }
    }
  }
`;

// implement Component
function Comments({ id, repositoryOwner, repositoryName, number }) {
  const { data, error, fetchMore, loading } = useQuery(
    GET_COMMENTS_FROM_ISSUE,
    {
      variables: {
        repositoryOwner,
        repositoryName,
        number,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  if (loading && !data?.repository) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <>
      <CommentList
        comments={data.repository.issue.comments}
        loading={loading}
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
        number={number}
        fetchMore={fetchMore}
      />
      <CommentAdd issueId={id} />
    </>
  );
}

function CommentList({
  comments,
  loading,
  repositoryOwner,
  repositoryName,
  number,
  fetchMore,
}) {
  const client = useApolloClient();
  const commentsEl = comments.edges.map(({ node }) => {
    return <CommentItem key={node.id} comment={node} />;
  });
  return (
    <div className="CommentList my-2">
      {commentsEl}
      <FetchMore
        loading={loading}
        hasNextPage={comments.pageInfo.hasNextPage}
        fetchMore={fetchMore}
        variables={{
          repositoryName,
          repositoryOwner,
          number,
          cursor: comments.pageInfo.endCursor,
        }}
      >
        comments
      </FetchMore>
    </div>
  );
}
export default React.memo(Comments);
