import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "./Calendar.module.css";
import moment from "moment";
import jwtDecode from "jwt-decode";
import PopUp from "../CreateEvent";
import { connect } from "react-redux";
import { deleteEvent } from "../../../redux/actions/events/delete";
import { subToEvent, unsubToEvent } from "../../../redux/actions/events/update";

const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.decoded = jwtDecode(localStorage.getItem("token")).id;

    this.state = {
      modal: false,
      visible: false,
      specificEvent: {},
      start: Date(),
      end: Date()
    };
  }

  // create the new event
  handleSelect = ({ start, end }) => {
    this.setState({ start: start, end: end });
    this.handleVisible();
  };

  handleVisible = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  delEvent = () => {
    this.props.deleteEvent({
      id: this.state.specificEvent.id
    });
  };

  //TODO combine subscribeToAnEvent with unsubscribeToAnEvent
  subscribeToAnEvent = () => {
    this.props.subToEvent({
      id: this.state.specificEvent.id
    });
  };

  unsubscribeToAnEvent = () => {
    this.props.unsubToEvent({
      id: this.state.specificEvent.id
    });
  };

  // Additional actions on the event. available only to the author
  editEvent(id) {
    if (this.decoded === id) {
      return <button onClick={this.delEvent}>delete</button>;
    }
  }

  // get full info abot the cpecific event
  eventInfo = info => {
    return (
      <div>
        <div>{info.title}</div>
        <div>{moment(info.start).format("ddd L HH:mm")}</div>
        <div>{moment(info.end).format("ddd L HH:mm")}</div>
        <div>{info.authorId}</div>
        {this.editEvent(info.authorId)}
        <input
          type="button"
          value="close"
          onClick={() => {
            this.setState({ modal: false });
          }}
        />
        <button onClick={this.subscribeToAnEvent}>Subscribe</button>
        <button onClick={this.unsubscribeToAnEvent}>Unubscribe</button>
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
          resizable
          localizer={localizer}
          events={events.map(event => {
            return {
              ...event,
              end: moment(event.end).toDate(),
              start: moment(event.start).toDate()
            };
          })}
          onSelectSlot={this.handleSelect}
          popup
          onSelectEvent={event => {
            this.setState({ specificEvent: event, modal: true });
          }}
        />
        {this.state.visible ? (
          <PopUp
            history={this.props.history}
            start={this.state.start}
            end={this.state.end}
            handleVisible={this.handleVisible}
          />
        ) : null}
        <div>{modal && <div>{this.eventInfo(specificEvent)}</div>}</div>
      </div>
    );
  }
}

//connection with redux
const mapStateToProps = state => {
  return {
    errors: state.events.errors,
    loading: state.events.loading,
  };
};

export default connect(mapStateToProps, {
  deleteEvent,
  subToEvent,
  unsubToEvent
})(MyCalendar);
