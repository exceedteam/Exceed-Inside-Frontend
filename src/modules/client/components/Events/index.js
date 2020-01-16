import React from "react";
import MyCalendar from "../Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jwtDecode from "jwt-decode";
import styles from "./Events.module.css";
import { connect } from "react-redux";
import { fetchEvents } from "../../../redux/actions/events/fetch";
import {
  subToAllEvents,
  unsubToAllEvents
} from "../../../redux/actions/events/update";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.decoded = jwtDecode(localStorage.getItem("token")).id;
    this.url = process.env.REACT_APP_API_URL;
    this.token = localStorage.getItem("token");

    this.state = {
      eventsOfUser: [],
      isEventsOfUser: false,
      newEvent: {
        selectedDays: []
      },
      list: []
    };
  }
  
  // TODO Add filter
  componentDidMount() {
    if (!this.props.events.length) {
      const { fetchEvents } = this.props;
      fetchEvents({
        page: 0,
        perPage: 50
      }).then(events => {
        const list = events.filter(event => event.authorId === this.decoded);
        this.setState({ eventsOfUser: list });
      });
    }
  }

  subToAllEvents = () => {
    this.props.subToAllEvents({});
  };

  unsubToAllEvents = () => {
    this.props.unsubToAllEvents({});
  };

  // switch between user events and all events
  handleDataCalendar = param => {
    switch (param) {
      case "All":
        this.setState({ isEventsOfUser: false });
        break;
      case "User":
        this.setState({ isEventsOfUser: true });
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, events } = this.props;
    const { isEventsOfUser, eventsOfUser } = this.state;
    return (
      <div className={styles.container}>
        {!loading && (
          <div className={styles.form}>
            <div>
              <input
                type="radio"
                name="event"
                value="All"
                onClick={() => {
                  this.handleDataCalendar("All");
                }}
              />
              {" All events"}
              <input
                type="radio"
                name="event"
                value="User"
                onClick={() => {
                  this.handleDataCalendar("User");
                }}
              />
              {" Events of User"}
            </div>
            <MyCalendar events={!!isEventsOfUser ? eventsOfUser : events} />
            <div className={styles.subscribeContainer}>
              <button className={styles.button} onClick={this.subToAllEvents}>
                sub
              </button>
              <button className={styles.button} onClick={this.unsubToAllEvents}>
                unsub
              </button>
            </div>
          </div>
        )}
        {loading && <h1>Loading...</h1>}
      </div>
    );
  }
}

//connection with redux
const mapStateToProps = state => {
  return {
    errors: state.events.errors,
    loading: state.events.loading,
    events: state.events.events
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  subToAllEvents,
  unsubToAllEvents
})(CreateEvent);
