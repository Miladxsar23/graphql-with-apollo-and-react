import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "../Navigation";
import Profile from "../Profile";
import Organization from "../Organization";

import * as routesPath from "../../constants/routes";

const App = (props) => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Container><Organization organizationName="facebook"/> </Container>} />
            <Route path={routesPath.PROFILE} element={<Container><Profile /></Container>} />
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
