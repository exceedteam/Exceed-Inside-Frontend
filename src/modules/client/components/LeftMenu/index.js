import React from "react";
import { Button } from "semantic-ui-react";
import "./leftMenu.scss";

export default class LeftMenu extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="leftMenu">
        <Button onClick={() => history.push("/")} className="navigationBtn">
          Main page
        </Button>
        <Button
          onClick={() => history.push("/create")}
          className="navigationBtn"
        >
          New post
        </Button>
        <Button
          onClick={() => history.push("/events")}
          className="navigationBtn"
        >
          Events
        </Button>
      </div>
    );
  }
}
