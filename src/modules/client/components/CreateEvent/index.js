import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import request from "../../../../services/api/axios/index";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: new Date()
    };
  }

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

  updateForm = event => {
    const newState = this.state;
    newState[event.target.id] = event.target.value;
    this.setState({ ...newState });
  };

  onChange = date => this.setState({ date });

  render() {
    console.log("state", this.state.title, this.state.date);
    const { title, date } = this.state;
    return (
      <form onSubmit={this.submitEvent}>
        <div>
          <Calendar onChange={this.onChange} value={date} />
        </div>
        <label htmlFor="title">
          <input
            id="title"
            type="text"
            value={title}
            onChange={this.updateForm}
            placeholder="# some title"
          />
        </label>
        <input type="submit" value="Create event" />
      </form>
    );
  }
}
