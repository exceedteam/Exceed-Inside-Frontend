import React from "react";
import MyCalendar from "../Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import request from "../../../../services/api/axios/index";
import jwtDecode from "jwt-decode";

const decoded = jwtDecode(localStorage.getItem("token")).id;

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      eventsOfUser: [],
      allEvents: [],
      newEvent: {
        selectedDays: []
      },
      list: []
    };
  }

  // get all events and events of user
  componentDidMount() {
    request
      .getAllEvents({
        params: this.state.params
      })
      .then(res => {
        this.setState({ allEvents: res.data, list: res.data, loaded: true });
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });

    request
      .getEventsOfUser({
        inputData: {
          id: decoded,
          params: this.state.params
        }
      })
      .then(res => {
        this.setState({ eventsOfUser: res.data, loaded: true });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  // switch between user events and all events
  mySwitchFunction = param => {
    switch (param) {
      case "All":
        return this.setState({ list: this.state.allEvents });
      case "User":
        return this.setState({ list: this.state.eventsOfUser });
      default:
        break;
    }
  };

  render() {
    const { loaded } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            <div>
              <p>
                <input
                  type="radio"
                  name="event"
                  value="All"
                  onClick={() => {
                    this.mySwitchFunction("All");
                  }}
                />
                {" All events"}
              </p>
              <p>
                <input
                  type="radio"
                  name="event"
                  value="User"
                  onClick={() => {
                    this.mySwitchFunction("User");
                  }}
                />
                {" Events of User"}
              </p>
            </div>
            <MyCalendar events={this.state.list} />
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
