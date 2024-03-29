import React, { useMemo } from "react";
import FetchMore from '../../FetchMore'
import Issues from '../../Issue'
import RepositoryItem from "../RepositoryItem";
import "./RepositoryList.scss";

function RepositoryList({ fetchMore, loading, repositories }) {
  const repoList = useMemo(() => {
    return repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="p-3 col-md-6 col-sm-12">
          <RepositoryItem {...node} />
          <Issues 
            repositoryName={node.name}
            repositoryOwner={node.owner.login}
          />
        </div>
      );
    });
  }, [repositories]);
  return (
    <React.Fragment>
      <div className="RepositoryList row">{repoList}</div>
      <FetchMore 
        fetchMore={fetchMore}
        hasNextPage={repositories.pageInfo.hasNextPage}
        loading={loading}
        variables={{
          cursor : repositories.pageInfo.endCursor
        }}
      >
        more
      </FetchMore>
    </React.Fragment>
  );
}

export default RepositoryList;
