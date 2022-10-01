import * as React from "react";
import { Button } from "react-bootstrap";
import Comments from "../../Commnet";
import Link from "../../Link";
function IssueItem({
  id,
  number,
  title,
  url,
  bodyHTML,
  repositoryOwner,
  repositoryName,
  isShowComment,
  onShowComment,
}) {

  return (
    <div className="IssueItem">
      <div className="IssueItem-content">
        <h3>
          <Link href={url}>{title}</Link>
        </h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
      <Button variant="primary" onClick={() => onShowComment(!isShowComment)}>
        Show comments
      </Button>
      {isShowComment && (
        <Comments
          id={id}
          repositoryOwner={repositoryOwner}
          repositoryName={repositoryName}
          number={number}
        />
      )}
    </div>
  );
}

export default React.memo(IssueItem);
