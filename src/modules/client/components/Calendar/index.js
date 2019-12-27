import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "./Calendar.module.css";
import request from "../../../../services/api/axios/index";
import moment from "moment";
const localizer = momentLocalizer(moment);

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      specificEvent: {}
    };
  }

  // create the new event
  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      request
        .createEvent({ start, end, title })
        .then(res => {
          if (res.error) {
            return console.log("error", res.error);
          }
        })
        .catch(error => {
          console.log("err", error);
        });
  };

  // get full info abot the cpecific event
  eventInfo = info => {
    return (
      <div>
        <div>{info.title}</div>
        <div>{moment(info.start).format("ddd L HH:mm")}</div>
        <div>{moment(info.end).format("ddd L HH:mm")}</div>
        <div>{info.authorId}</div>
        <input
          type="button"
          value="close"
          onClick={() => {
            this.setState({ modal: false });
          }}
        />
      </div>
    );
  };

  render() {
    const { modal, specificEvent } = this.state;
    const { events } = this.props;
    return (
      <div className={styles.selectableDate}>
        <Calendar
          selectable
          localizer={localizer}
          events={events.map(e => {
            return {
              ...e,
              end: moment(e.end).toDate(),
              start: moment(e.start).toDate()
            };
          })}
          onSelectSlot={this.handleSelect}
          popup
          onSelectEvent={event => {
            this.setState({ specificEvent: event, modal: true });
          }}
        />
        <div>{modal && <div>{this.eventInfo(specificEvent)}</div>}</div>
      </div>
    );
  }
}
