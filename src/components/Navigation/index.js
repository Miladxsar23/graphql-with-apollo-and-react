import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import * as routesPath from "../../constants/routes";
function Navigation() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mw-100">
        <Container>
          <Navbar.Brand href="#home">Github</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink className="nav-link" to={routesPath.ORGANIZATION}>organization</NavLink>
                <NavLink className="nav-link" to={routesPath.PROFILE}>profile</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default React.memo(Navigation);
