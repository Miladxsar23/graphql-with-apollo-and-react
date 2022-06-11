import * as React from "react";
import RepositoryItem from "../RepositoryItem";
import "./RepositoryList.scss";

const RepositoryList = ({repositories}) => {
    console.log(repositories)
  return repositories.edges.map(({ node }) => {
    return (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    );
  });
};

export default RepositoryList;
