import React from 'react';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../redux/actions/events/delete';
import { subToEvent, unsubToEvent } from '../../../redux/actions/events/update';
import { Header, Icon, Dropdown } from 'semantic-ui-react';
import './aboutEvent.scss';

class AboutEvent extends React.Component {
	constructor(props) {
		super(props);
		this.decoded = jwtDecode(localStorage.getItem('token')).id;
		this.state = {
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

	// Additional actions on the event. available only to the author
	eventInfo(id) {
		if (this.decoded === id) {
			return (
				<React.Fragment>
					<Dropdown.Divider />
					<Dropdown.Item icon="edit" text="Edit" onClick={this.props.handleVisibleEdit} />
					<Dropdown.Item icon="trash" text="Delete" onClick={this.delEvent} />
				</React.Fragment>
			);
		} else {
			return null;
		}
	}

	render() {
		const { specificEvent } = this.props;
		return (
			<div className="aboutEvent">
				<Dropdown className="threeDots" pointing="right" icon="ellipsis vertical">
					<Dropdown.Menu>
						<Dropdown.Item icon="bell" text="Subsscribe" onClick={this.subscribeToAnEvent} />
						<Dropdown.Item icon="bell slash" text="Unsubscribe" onClick={this.unsubscribeToAnEvent} />
						<Dropdown.Item icon="users" text="Followed Users" />
						{this.eventInfo(specificEvent.authorId)}
					</Dropdown.Menu>
				</Dropdown>
				<Header as="h2" className="header">{specificEvent.title}</Header>
				<div className="timeOfEvent">
					<Icon disabled name="clock" size="big" color="blue" />
					<div className="date">{moment(specificEvent.start).format('MMMM D, YYYY HH:mm')}</div>
					<Icon disabled name="minus" size="big" color="blue" />
					<div className="date">{moment(specificEvent.end).format('MMMM D, YYYY HH:mm')}</div>
				</div>
				<div
					className="linkToAuthor"
					onClick={() => this.props.history.push(`/user/${specificEvent.authorId}`)}
				>
					@ {specificEvent.author.name}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
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
