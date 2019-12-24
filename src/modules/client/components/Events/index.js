import React from "react";
import { createID, prettyDate } from "../../../../services/helpers";
import request from "../../../../services/api/axios/index";
import { UserHeader } from "../UserHeader";

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: [],
      params: {
        page: 0,
        perPage: 10
      }
    };
  }

  componentDidMount() {
    request
      .getAllEvents({
        params: this.state.params
      })
      .then(data => {
        this.setState(data);
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });
  }

  renderEvents = () => {
    const { data } = this.state;
    return data.map(item => {
      return (
        <div key={createID()}>
          <div>
            <UserHeader
              name={item.author.name}
              avatar={item.author.avatar}
              onClick={() => this.props.history.push(`/user/${item.authorId}`)}
            />
          </div>
          <div
            onClick={() => {
              this.props.history.push(`/event/${item.id}`);
            }}
          >
            <div>
              <span>CreatedAt: </span>
              {prettyDate(item.createdAt)}
            </div>
            {/* TODO add display data events */}
            <div>{item.title}</div>
            <div>{item.text}</div>
            <div>
              <span>subscribed Users: </span>
              {item.subscribedUsers.length}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { loaded } = this.state;
    return (
      <div>
        {loaded && <div>{this.renderEvents()}</div>}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
