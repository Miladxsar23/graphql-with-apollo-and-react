import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function OrganizationSearch({ organizationName, onOrganizationSearch }) {
  const [search, setSerach] = React.useState(organizationName);
  const onSubmit = (evt) => {
    evt.preventDefault();
    onOrganizationSearch(search);
  };
  const onChange = (evt) => {
    const { value } = evt.target;
    setSerach(value);
  };
  return (
    <Form className="d-flex" onSubmit={onSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={onChange}
        value={search}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default React.memo(OrganizationSearch);
