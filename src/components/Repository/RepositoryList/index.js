import * as React from "react";
import RepositoryItem from "../RepositoryItem";
import "./RepositoryList.scss";

const RepositoryList = ({ repositories }) => {
  return repositories.edges.map(({ node }) => {
    return (
      <div key={node.id} className="RepositoryItem p-3">
        <RepositoryItem {...node} />
      </div>
    );
  });
};

export default RepositoryList;
