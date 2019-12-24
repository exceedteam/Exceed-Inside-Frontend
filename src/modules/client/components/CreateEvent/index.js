import React from "react";
import request from "../../../../services/api/axios/index";
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { createID } from "../../../../services/helpers";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      title: "",
      text: "",
      selectedDays: []
    };
  }

  // save event on the server
  submitEvent = event => {
    event.preventDefault();
    request
      .createEvent({ ...this.state })
      .then(res => {
        if (res.error) {
          return console.log("error", res.error);
        }
        this.props.history.push("/events");
      })
      .catch(error => {
        console.log("err", error);
      });
  };

  // updating input fields in the state
  updateForm = event => {
    const newState = this.state;
    newState[event.target.id] = event.target.value;
    this.setState({ ...newState });
  };

  // multiple date selection
  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      // set time to 00:00
      selectedDays.push(
        moment(day)
          .hour(0)
          .toDate()
      );
    }
    this.setState({ selectedDays });
  }

  // render selected days
  renderSelectedDays = () => {
    const { selectedDays } = this.state;
    return selectedDays.map(day => {
      return (
        <div key={createID()}>
          <label htmlFor="times">
            {moment(day).format("L")}
            <select onChange={e => this.handleTime(e, day, "h")}>
              {<option hidden>{moment(day).hour()}</option>}
              {this.options(24)}
            </select>
            <select onChange={e => this.handleTime(e, day, "m")}>
              {<option hidden>{moment(day).minute()}</option>}
              {this.options(60, 5)}
            </select>
          </label>
        </div>
      );
    });
  };

  // drop-down list
  options = (number, range = 1) => {
    const times = new Array(parseInt(number / range))
      .fill(0)
      .map((item, index) => index * range);
    return times.map(time => {
      return (
        <option key={createID()} value={time}>
          {time}
        </option>
      );
    });
  };

  // save time in the state
  handleTime = (e, day, type) => {
    e.preventDefault();
    const { selectedDays } = this.state;
    const time = parseInt(e.target.value);
    const selected = selectedDays.indexOf(day);
    if (type === "h") {
      selectedDays[selected] = moment(day)
        .hour(time)
        .toDate();
      this.setState({ selectedDays });
    }
    if (type === "m") {
      selectedDays[selected] = moment(day)
        .minute(time)
        .toDate();
      this.setState({ selectedDays });
    }
  };

  render() {
    const { title, text, selectedDays } = this.state;
    return (
      <form onSubmit={this.submitEvent}>
        <div>
          <DayPicker
            selectedDays={selectedDays}
            onDayClick={this.handleDayClick}
          />
        </div>
        {this.renderSelectedDays()}
        <div>
          <label htmlFor="title">
            <input
              id="title"
              type="text"
              value={title}
              onChange={this.updateForm}
              placeholder="# some title"
            />
          </label>
        </div>
        <div>
          <label htmlFor="text">
            <input
              id="text"
              type="text"
              value={text}
              onChange={this.updateForm}
              placeholder="some text"
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Create event" />
        </div>
      </form>
    );
  }
}
