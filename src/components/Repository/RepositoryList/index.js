import React, { useMemo } from "react";
import RepositoryItem from "../RepositoryItem";
import "./RepositoryList.scss";



function updateQuery(exiting, {fetchMoreResult}) {
  if(!fetchMoreResult) {
    return exiting
  }
  return {
    ...exiting, 
    viewer : {
      ...exiting.viewer, 
      repositories : {
        ...exiting.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...exiting.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges
        ]
      }
    }
  }
}
function RepositoryList({ repositories, fetchMore }){
  const repoList = useMemo(() => {
    return repositories.edges.map(({ node }) => {
      return (
        <div key={node.id} className="p-3 col-md-6 col-sm-12">
          <RepositoryItem {...node} />
        </div>
      );
    });
  }, [repositories]);
  return (
    <React.Fragment>
      <div className="RepositoryList row">{repoList}</div>
      {repositories.pageInfo.hasNextPage && (
        <button onClick={() => fetchMore({
          variables : {
            cursor : repositories.pageInfo.endCursor, 
          },
          updateQuery
        })}>
          More
        </button>
      )}
    </React.Fragment>
  )
};

export default RepositoryList;
