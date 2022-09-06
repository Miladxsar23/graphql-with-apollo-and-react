import * as React from "react";
import Spinner from "../Spinner";
import { ButtonUnobtrusive } from "../Button";
import "./index.scss";
function FetchMore({
  children,
  fetchMore,
  hasNextPage,
  loading,
  updateQuery,
  variables,
}) {
  return (
    <div className="w-100">
      {loading ? (
        <Spinner />
      ) : (
        hasNextPage && (
          <ButtonUnobtrusive
            className="d-block btn btn-primary mx-auto my-2"
            onClick={() => {
              fetchMore({
                variables,
                updateQuery,
              });
            }}
          >
            {children}
          </ButtonUnobtrusive>
        )
      )}
    </div>
  );
}

export default React.memo(FetchMore);
