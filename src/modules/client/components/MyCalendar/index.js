import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "./MyCalendar.module.css";
import moment from "moment";
import CreateEvent from "../CreateEvent";
import AboutEvent from "../AboutEvent";
import ModalWindow from "../Modal";
import { connect } from "react-redux";
import { editEvent } from "../../../redux/actions/events/update";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

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
    this.handleVisibleEvent();
  };

  handleVisibleEvent = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  handleVisibleInfo = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  // get full info abot the cpecific event
  eventInfo = info => {
    return (
      <div>
        <ModalWindow
          title={"About Event"}
          isOpen={this.state.modal}
          handleVisible={this.handleVisibleInfo}
        >
          <AboutEvent
            specificEvent={info}
            handleVisibleInfo={this.handleVisibleInfo}
            modal={this.state}
          />
        </ModalWindow>
      </div>
    );
  };

  // Allows you to change the time intervals of the event
  moveEvent = ({ event, start }) => {
    const oldEnd = event.end;
    const oldStart = event.start;
    const minutes = moment(oldEnd).diff(moment(oldStart), "minutes");
    const newEnd = moment(start)
      .add(minutes, "minutes")
      .toDate();
    const updatedEvent = { ...event, start, end: newEnd };
    this.props.editEvent({
      event: updatedEvent,
      id: event.id
    });
  };

  resizeEvent = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    this.props.editEvent({
      event: updatedEvent,
      id: event.id
    });
  };

  render() {
    const { modal, specificEvent } = this.state;
    const { events } = this.props;
    return (
      <div className={styles.selectableDate}>
        <DragAndDropCalendar
          selectable
          resizable
          localizer={localizer}
          onSelectSlot={this.handleSelect}
          events={events.map(event => {
            return {
              ...event,
              end: moment(event.end).toDate(),
              start: moment(event.start).toDate()
            };
          })}
          onEventResize={this.resizeEvent}
          onEventDrop={this.moveEvent}
          popup
          onSelectEvent={event => {
            this.setState({ specificEvent: event, modal: true });
          }}
        />
        <ModalWindow
          title={"Create Event"}
          isOpen={this.state.visible}
          handleVisible={this.handleVisibleEvent}
        >
          <CreateEvent
            history={this.props.history}
            start={this.state.start}
            end={this.state.end}
            handleVisibleEvent={this.handleVisibleEvent}
            button={"Create Event"}
          />
        </ModalWindow>
        <div>{modal && <div>{this.eventInfo(specificEvent)}</div>}</div>
      </div>
    );
  }
}

export default connect(null, { editEvent })(MyCalendar);
