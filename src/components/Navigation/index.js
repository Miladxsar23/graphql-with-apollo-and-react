import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import OrganizationSearch from "../OrganizationSearch";
import * as routesPath from "../../constants/routes";
function Navigation() {
  const location = useLocation();
  const [searchParams, setSerachParams] = useSearchParams();
  const onOrganizationSearch = (value) => {
    setSerachParams({organization : value})
  };

  return (
    <>
      <Navbar bg="light" className="mw-100" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Github</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to={routesPath.ORGANIZATION}>
                organization
              </NavLink>
              <NavLink className="nav-link" to={routesPath.PROFILE}>
                profile
              </NavLink>
            </Nav>
            {location.pathname === routesPath.ORGANIZATION && (
              <OrganizationSearch
                organizationName={searchParams.get('organization') || ""}
                onOrganizationSearch={onOrganizationSearch}
              />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default React.memo(Navigation);
