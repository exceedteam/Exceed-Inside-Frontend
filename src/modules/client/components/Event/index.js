import React from "react";
import request from "../../../../services/api/axios/index";
import { prettyDate } from "../../../../services/helpers";
import { UserHeader } from "../UserHeader";

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      event: {}
    };
  }

  componentDidMount() {
    request
      .getEvent({
        id: this.state.id
      })
      .then(res => {
        this.setState({ event: res.data, loaded: res.loaded });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  renderEvent = () => {
    const { avatar, name } = this.state.event.author;
    const { date, title, authorId } = this.state.event;
    return (
      <div>
        <div>
          <UserHeader
            name={name}
            avatar={avatar}
            onClick={() => this.props.history.push(`/user/${authorId}`)}
          />
        </div>
        <div>{title}</div>
        <div>{prettyDate(date)}</div>
      </div>
    );
  };
  //TODO add subscribed users
  render() {
    const { loaded } = this.state;
    return (
      <div>
        {loaded && <div>{this.renderEvent()}</div>}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
