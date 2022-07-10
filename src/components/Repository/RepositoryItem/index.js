import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import Link from "../../Link";
import Button from "../../Button";
import REPOSITORY_FRAGMENT from "../fragments";
import "./RepositoryItem.scss";

// mutaions
const STAR_REPOSITORY = gql`
  mutation STAR_REPOSITORY($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStar($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION = gql`
  mutation updateSubscription($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;
// update method to update apollo cache after mutations
const updateAddStar = (
  cache,
  {
    data: {
      addStar: {
        starrable: { id },
      },
    },
  }
) => {
  const repository = cache.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  const totalCount = repository.stargazers.totalCount + 1;
  cache.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        __typename: "StargazerConnection",
        totalCount,
      },
    },
  });
};

const updateRemoveStar = (
  cache,
  {
    data: {
      removeStar: {
        starrable: { id },
      },
    },
  }
) => {
  const repository = cache.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  const totalCount = repository.stargazers.totalCount - 1;
  cache.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        __typename: "StargazerConnection",
        totalCount,
      },
    },
  });
};

const updateSubscriptionCallback = (
  cache,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  }
) => {
  const repository = cache.readFragment({
    id: `Repository : ${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  cache.writeFragment({
    id: `"Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      viewerSubscription: viewerSubscription,
    },
  });
};

// Component
const RepositoryItem = ({
  id,
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
  const [addStar, addStarPayload] = useMutation(STAR_REPOSITORY, {
    variables: { id },
    update: updateAddStar,
  });
  const [removeStar, removeStarPayload] = useMutation(REMOVE_STAR, {
    variables: { id },
    update: updateRemoveStar,
  });
  const [updateSubscription, updateSubscriptionPayLoad] = useMutation(
    UPDATE_SUBSCRIPTION,
    {
      variables: { id },
    }
  );
  const loading =
    addStarPayload.loading ||
    removeStarPayload.loading ||
    updateSubscriptionPayLoad.loading;
  const error =
    addStarPayload.error ||
    removeStarPayload.error ||
    updateSubscriptionPayLoad.error;
  if (error) return `error : ${error.message}`;
  return (
    <div className="RepositoryItem p-3 border">
      <div className="RepositoryItem-header d-flex justify-content-between">
        <div className="RepositoryItem-header-title w-100">
          <h6>
            <Link href={url}>{name}</Link>
          </h6>
        </div>

        <div className="RepositoryItem-header-actions d-flex w-50">
          <Button
            size="sm"
            color="warning"
            onClick={viewerHasStarred ? removeStar : addStar}
            disabled={loading}
          >
            {stargazers.totalCount}
          </Button>
          <select
            className="form-select form-select-sm"
            value={viewerSubscription}
            onChange={(e) => {
              const { value } = e.target;
              updateSubscription({
                variables: {
                  state: value,
                },
              });
            }}
          >
            <option value="UNSUBSCRIBED">Unwatch</option>
            <option value="SUBSCRIBED">Watch</option>
            <option value="IGNORED">Ignore</option>
          </select>
        </div>
      </div>

      <div className="RepositoryItem-description">
        <div className="RepositoryItem-description-action">
          {stargazers.totalCount} Stars
        </div>
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

export default RepositoryItem;
