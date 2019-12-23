import React from "react";
import request from "../../../../services/api/axios/index";
import { prettyDate, createID } from "../../../../services/helpers";

export default class EventsOfUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      eventsOfUser: [],
      params: {
        page: 0,
        perPage: 5
      }
    };
  }

  componentDidMount() {
    request
      .getEventsOfUser({
        inputData: {
          id: this.state.id,
          params: this.state.params
        }
      })
      .then(res => {
        this.setState({ eventsOfUser: res.data, loaded: res.loaded });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  renderEventsOfUser = () => {
    const { eventsOfUser, id } = this.state;
    return eventsOfUser.map(item => {
      return (
        <div key={createID()}>
          <div
            onClick={() => {
              this.props.history.push(`/user/${id}`);
            }}
          >
            <img src={item.author.avatar} alt="" />
            {item.author.name}
          </div>
          <div
            onClick={() => {
              this.props.history.push(`/event/${item.id}`);
            }}
          >
            <div>
              <span>{prettyDate(item.createdAt)}</span>
            </div>
            <span>{item.title}</span>
          </div>
        </div>
      );
    });
  };

  render() {
    const { loaded } = this.state;
    return (
      <div>
        {loaded && <div>{this.renderEventsOfUser()}</div>}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
