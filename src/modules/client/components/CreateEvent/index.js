import React from "react";
import moment from "moment";
import styles from "./CreateEvent.module.css";
import { connect } from "react-redux";
import { createEvent } from "../../../redux/actions/events/create";

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        title: "",
        startDate: this.props.start,
        startTime: moment(this.props.start).format("HH:mm"),

        endDate: this.props.end,
        endTime: moment(this.props.end).format("HH:mm")
      }
    };
  }

  // save data about new event on state
  updateDataOfEvent = event => {
    const newState = this.state.eventData;
    newState[event.target.id] = event.target.value;
    this.setState({
      eventData: { ...newState }
    });
  };

  submitPost = event => {
    event.preventDefault();
    const {
      title,
      startDate,
      startTime,
      endDate,
      endTime
    } = this.state.eventData;
    // combine date with time
    const start = moment(startDate)
      .set({ hour: startTime.split(":")[0], minute: startTime.split(":")[1] })
      .toDate();
    const end = moment(endDate)
      .set({ hour: endTime.split(":")[0], minute: endTime.split(":")[1] })
      .toDate();

    this.props.createEvent({
      title: title,
      start: start,
      end: end
    });
    this.props.handleVisible();
  };

  render() {
    const { startDate, startTime, endDate, endTime } = this.state.eventData;
    return (
      <div className={styles.createForm}>
        <div className={styles.headerEvent}>
          <h3 className={styles.title}>Create Event</h3>
          <button
            className={styles.button}
            type="button"
            onClick={this.props.handleVisible}
            value="Cancel"
          >
            Cancel
          </button>
        </div>
        <form className={styles.contain}>
          <input
            className={styles.inputTitle}
            id="title"
            type="text"
            name="name"
            onChange={this.updateDataOfEvent}
            placeholder="Title"
          />
          <div>
            <span className={styles.title}>Start Time:</span>
            <input
              className={styles.input}
              id="startDate"
              type="date"
              max={endDate}
              value={moment(startDate).format("YYYY-MM-DD") || ""}
              onChange={this.updateDataOfEvent}
            />
            <input
              className={styles.input}
              id="startTime"
              type="time"
              max={startTime}
              value={startTime}
              onChange={this.updateDataOfEvent}
            />
          </div>
          <div>
            <span className={styles.title}>End Time:</span>
            <input
              className={styles.input}
              id="endDate"
              type="date"
              min={startDate}
              value={moment(endDate).format("YYYY-MM-DD") || ""}
              onChange={this.updateDataOfEvent}
            />
            <input
              className={styles.input}
              id="endTime"
              type="time"
              min={startTime}
              value={endTime}
              onChange={this.updateDataOfEvent}
            />
          </div>
          <br />
          <button onClick={this.submitPost} className={styles.submit}>
            Create event
          </button>
        </form>
      </div>
    );
  }
}

//connection with redux
export default connect(null, { createEvent })(PopUp);
