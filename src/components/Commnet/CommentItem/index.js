import * as React from "react";
import "./index.scss";

function CommentItem({comment}) {
    return (
        <div className="CommentItem p-3 border rounded bg-black">
            <div className="CommentItem_header d-flex justify-content-between align-items-center">
                <h6 className="text-white">{comment.author.login}</h6>
                <small className="text-muted">{comment.createdAt}</small>
            </div>
            <div className="CommentItem_body mt-2">
                <div className="text-secondary" dangerouslySetInnerHTML={{__html:comment.bodyHTML}} />
            </div>
        </div>
    )
}
export default React.memo(CommentItem);
