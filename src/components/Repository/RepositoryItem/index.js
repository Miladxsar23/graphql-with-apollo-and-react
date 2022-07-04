import * as React from "react";
import Link from "../../Link";
import "./RepositoryItem.scss";
const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => {
  return (
    <div className="RepositoryItem p-3 border">
      <div className="RepositoryItem-title">
        <h5>
          <Link href={url}>{name}</Link>
        </h5>

        <div className="RepositoryItem-title-action">
          {stargazers.totalCount} Stars
        </div>
      </div>

      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem
