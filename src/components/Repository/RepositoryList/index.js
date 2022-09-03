import React, { useMemo } from "react";
import RepositoryItem from "../RepositoryItem";
import "./RepositoryList.scss";

function RepositoryList({ repositories }){
  const repoList = useMemo(() => {
    return repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="p-3 col-md-6 col-sm-12">
          <RepositoryItem {...node} />
        </div>
      );
    });
  }, [repositories]);
  return <div className="RepositoryList row">{repoList}</div>;
};

export default RepositoryList;
