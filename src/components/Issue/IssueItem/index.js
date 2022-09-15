import * as React from "react";
import Link from "../../Link";
function IssueItem({ id, number, state, title, url, bodyHTML }) {
  return (
    <div className="IssueItem">
      <div className="IssueItem-content">
        <h3>
          <Link href={url}>{title}</Link>
        </h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
    </div>
  );
}

export default React.memo(IssueItem)
