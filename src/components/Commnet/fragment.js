import { gql } from "@apollo/client";

const COMMENT_FRAGMENT = gql`
  fragment comment on Comment {
    id
    author {
      login
    }
    bodyHTML
    createdAt
  }
`;

export default COMMENT_FRAGMENT;
