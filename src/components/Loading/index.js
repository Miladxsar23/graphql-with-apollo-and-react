import React, { Component } from "react";
import './Loading.scss'
class Loading extends Component {
  state = {
    classes: "Loading",
  };
  componentDidMount() {
    this.setState({
      classes: "Loading show",
    });
  }
  componentWillUnmount() {
    this.setState({
      classes: "Loading fade",
    });
  }
  render() {
    const { classes } = this.state;
    return (
      <div className={classes}>
        <span></span>
      </div>
    );
  }
}


export default Loading
