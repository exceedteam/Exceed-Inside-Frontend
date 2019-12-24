import React from "react";
import request from "../../../../services/api/axios/index";
import { createID } from "../../../../services/helpers";
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
        console.log(res)
        this.setState({ event: res.data, loaded: res.loaded });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  renderEvent = () => {
    console.log("subscribedUsers", this.state.event.subscribedUsers)
    const { avatar, name } = this.state.event.author;
    const { title, authorId, text, subscribedUsers } = this.state.event;
    return (
      <div>
        <div>
          <UserHeader
            name={name}
            avatar={avatar}
            onClick={() => this.props.history.push(`/user/${authorId}`)}
          />
        </div>
        <div>title: {title}</div>
        <div>text: {text}</div>
        <div>
          lists of subscribed users:
          {subscribedUsers.map(user => (
            <div key={createID()}>{user.id}</div>
          ))}
        </div>
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
