import * as React from "react";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";

function OrganizationSearch() {
  const [searchParams, setSerachParams] = useSearchParams()
  const inputEL = useRef(null)
  const onSubmit = (evt) => {
    evt.preventDefault();
    setSerachParams({organization : inputEL.current.value});
  };
  return (
    <Form className="d-flex" onSubmit={onSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        ref={inputEL}
        defaultValue={searchParams.get("organization") || ""}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default React.memo(OrganizationSearch);
