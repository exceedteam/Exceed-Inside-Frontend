import React from 'react';
import { connect } from 'react-redux';
import { clearMessage } from '../../redux/actions/common';
import './alert.scss';

class AlertMessage extends React.Component {
  render() {
    if (this.props.message)
      return (
        <div
          className='alert'
          ref={(node) => {
            this.alert = node;
          }}
        >
          <span
            className='closebtn'
            onClick={() => {
              this.props.clearMessage(this.props.type);
            }}
          >
            &times;
          </span>
          {this.props.message}
        </div>
      );
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { message } = ownProps.type ? state[ownProps.type] : state.events;
  return {
    message
  };
};

export default connect(mapStateToProps, { clearMessage })(AlertMessage);
