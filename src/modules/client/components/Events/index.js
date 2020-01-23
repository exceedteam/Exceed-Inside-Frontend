import React from "react";
import MyCalendar from "../MyCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jwtDecode from "jwt-decode";
import styles from "./Events.module.css";
import { connect } from "react-redux";
import { fetchEvents } from "../../../redux/actions/events/fetch";
import Loader from "../Loader";
import {
  subToAllEvents,
  unsubToAllEvents
} from "../../../redux/actions/events/update";

class Events extends React.Component {
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
      }
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

  visbleLoad = () => {
    const internal = document.getElementById("internal");
    if (this.props.internalLoading) {
      internal.style.display = "block";
    } else {
      internal.style.display = "none";
    }
  };

  render() {
    const { loading, events, internalLoading } = this.props;
    const { isEventsOfUser, eventsOfUser } = this.state;
    return (
      <div className={styles.container}>
        {!loading && (
          <div>
            <div className={styles.form}>
            {internalLoading && <Loader />}
              <MyCalendar events={!!isEventsOfUser ? eventsOfUser : events} />
              <div className={styles.bottom}>
                <div className={styles.subscribeContainer}>
                  <button
                    className={styles.button}
                    onClick={this.subToAllEvents}
                  >
                    sub
                  </button>
                  <button
                    className={styles.button}
                    onClick={this.unsubToAllEvents}
                  >
                    unsub
                  </button>
                </div>
                <div className={styles.radioContainer}>
                  <div>
                    <input
                      type="radio"
                      name="event"
                      value="All"
                      id="all"
                      className={styles.radio}
                      onClick={() => {
                        this.handleDataCalendar("All");
                      }}
                    />
                    <label htmlFor="all">All Events</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="event"
                      value="User"
                      id="some"
                      className={styles.radio}
                      onClick={() => {
                        this.handleDataCalendar("User");
                      }}
                    />
                    <label htmlFor="some">My Events</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

//connection with redux
const mapStateToProps = state => {
  return {
    errors: state.events.errors,
    loading: state.events.loading,
    events: state.events.events,
    internalLoading: state.events.internalLoading
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  subToAllEvents,
  unsubToAllEvents
})(Events);
