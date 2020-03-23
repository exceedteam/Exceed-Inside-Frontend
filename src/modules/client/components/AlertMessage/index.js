import React from 'react';
import { connect } from 'react-redux';
import { ClearMessage } from '../../../redux/actions/events/update';
import './alert.scss';

class AlertMessage extends React.Component {
	render() {
		if (this.props.message)
			return (
				<div
					className="alert"
					ref={(node) => {
						this.alert = node;
					}}
				>
					<span
						className="closebtn"
						onClick={() => {
							this.props.ClearMessage();
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

const mapStateToProps = (state) => {
	return {
		message: state.events.message
	};
};

export default connect(mapStateToProps, { ClearMessage })(AlertMessage);
