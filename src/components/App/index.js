import React, { Component } from "react";
import Profile from "../Profile";
import { Container } from "react-bootstrap";
import "./App.scss";
class App extends Component {
  render() {
    return (
      <Container>
        <Profile />
      </Container>
    );
  }
}

export default App;
