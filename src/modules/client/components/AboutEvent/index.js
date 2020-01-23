import React from "react";
import styles from "./AboutEvent.module.css";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { deleteEvent } from "../../../redux/actions/events/delete";
import { subToEvent, unsubToEvent } from "../../../redux/actions/events/update";
import ModalWindow from "../Modal";
import CreateEvent from "../CreateEvent";
import { PostHeader } from "../PostHeader";

class AboutEvent extends React.Component {
  constructor(props) {
    super(props);
    this.decoded = jwtDecode(localStorage.getItem("token")).id;
    this.state = {
      visibleEdit: false
    };
  }

  delEvent = () => {
    this.props.deleteEvent({
      id: this.props.specificEvent.id
    });
    this.props.handleVisibleInfo();
  };

  subscribeToAnEvent = () => {
    this.props.subToEvent({
      id: this.props.specificEvent.id
    });
    this.props.handleVisibleInfo();
  };
  unsubscribeToAnEvent = () => {
    this.props.unsubToEvent({
      id: this.props.specificEvent.id
    });
    this.props.handleVisibleInfo();
  };

  handleVisibleEvent = () => {
    const { visibleEdit } = this.state;
    this.setState({ visibleEdit: !visibleEdit });
    if (visibleEdit) this.props.handleVisibleInfo();
  };

  editEvent = () => {
    const { start, end, title } = this.props.specificEvent;
    return (
      <div>
        <ModalWindow
          title={"Edit Event"}
          isOpen={this.state.visibleEdit}
          handleVisible={this.handleVisibleEvent}
        >
          <CreateEvent
            history={this.props.history}
            start={start}
            end={end}
            title={title}
            handleVisibleEvent={this.handleVisibleEvent}
            id={this.props.specificEvent.id}
            button={"Edit Event"}
          />
        </ModalWindow>
      </div>
    );
  };

  // Additional actions on the event. available only to the author
  eventInfo(id) {
    if (this.decoded === id) {
      return (
        <div>
          {this.editEvent()}
          <button onClick={this.delEvent}>delete</button>
          <button onClick={this.handleVisibleEvent}>edit</button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { specificEvent, modal } = this.props;
    return (
      <div>
        {modal && (
          <div>
            <div>
              <PostHeader
                name={specificEvent.author.name}
                avatar={specificEvent.author.avatar}
              />
            </div>
            <div className={styles.titleOfEvent}>{specificEvent.title}</div>
            <div>
              <span>{"Srart: "}</span>
              {moment(specificEvent.start).format("ddd L HH:mm")}
            </div>
            <div>
              <span>{"End: "}</span>
              {moment(specificEvent.end).format("ddd L HH:mm")}
            </div>
            {this.eventInfo(specificEvent.authorId)}
            <button onClick={this.subscribeToAnEvent}>Subscribe</button>
            <button onClick={this.unsubscribeToAnEvent}>Unubscribe</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.events.errors,
    loading: state.events.loading
  };
};

export default connect(mapStateToProps, {
  deleteEvent,
  subToEvent,
  unsubToEvent
})(AboutEvent);
