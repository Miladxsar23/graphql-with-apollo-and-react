import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import "./index.scss";
import ErrorMessage from "../../Error/ErrorMessage";
import Spinner from "../../Spinner";

// mutation document
const ADD_COMMENT_TO_ISSUE = gql`
  mutation AddComment($id: ID!, $body: String!) {
    addComment(input: { subjectId: $id, body: $body }) {
      commentEdge {
        cursor
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
`;

// update functions
function updateAddComment(
  cache,
  {
    data: {
      addComment: {
        commentEdge: {
          node: { id, bodyHTML, author, createdAt, cursor },
        },
      },
    },
  },
  issueId
) {
  const newCommentRef = cache.writeFragment({
    id: `IssueComment:${id}`,
    fragment: gql`
      fragment comment on IssueComment {
        id
        bodyHTML
        author {
          login
        }
        createdAt
      }
    `,
    data: {
      id,
      bodyHTML,
      author,
      createdAt,
    },
  });
  const newComment = {
    __typename : "IssueCommentEdge", 
    cursor, 
    node : {...newCommentRef}
  }
  cache.modify({
    id: cache.identify({ __typename: "Issue", id: issueId }),
    fields: {
      comments(existing = {}) {

        return {
          ...existing,
          pageInfo :{
            ...existing.pageInfo, 
            hasNextPage : true, 
            endCursor : cursor
          },
          edges: [...existing.edges, newComment],
        };
      },
    },
  });
}

function CommentAdd({ issueId }) {
  const bodyInput = React.useRef("");
  const [addComment, { error, data, loading }] = useMutation(
    ADD_COMMENT_TO_ISSUE,
    {
      variables: {
        id: issueId,
      },
      update : (cache, data) => {
        updateAddComment(cache, data, issueId)
      }
    }
  );
  const onSubmit = (evt) => {
    evt.preventDefault();
    addComment({
      variables: {
        body: bodyInput.current.value,
      },
    }).then(() => {
      bodyInput.current = "";
    });
  };
  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Spinner />;
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comment</Form.Label>
        <textarea ref={bodyInput} className="form-control" />
      </Form.Group>
      <Button className="d-block btn-sm btn-success mx-auto mb-4" type="submit">
        Send Comment
      </Button>
    </Form>
  );
}

export default CommentAdd;
