import React from 'react';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../redux/actions/events/delete';
import { subToEvent, unsubToEvent } from '../../../redux/actions/events/update';
import ModalWindow from '../Modal';
import CreateEvent from '../CreateEvent';
import { Button, Header, Icon, Dropdown } from 'semantic-ui-react';
import './aboutEvent.scss';

class AboutEvent extends React.Component {
	constructor(props) {
		super(props);
		this.decoded = jwtDecode(localStorage.getItem('token')).id;
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
					title={'Edit Event'}
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
						button={'Edit Event'}
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
					<Button onClick={this.delEvent}>
						<Icon name="trash" />
					</Button>
					<Button onClick={this.handleVisibleEvent}>
						<Icon name="edit" />
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		const { specificEvent, modal } = this.props;
		return (
			<div className="aboutEvent">
				{modal && (
					<React.Fragment>
						<Dropdown
							className="threeDots"
							trigger={
								<span>
									<Icon name="ellipsis vertical" />
								</span>
							}
							options={[
								{ key: 'subscribe', text: 'Subsscribe', icon: 'bell' },
								{ key: 'unsubscribe', text: 'Unsubscribe', icon: 'bell slash' },
								{ key: 'users', text: 'Added Users', icon: 'users' },
								{ key: 'edit', text: 'Edit', icon: 'edit' },
								{ key: 'trash', text: 'Delete', icon: 'trash' }
							]}
							pointing="right"
							icon={null}
						/>
						<Header as="h2">{specificEvent.title}</Header>
						<div className="timeOfEvent">
							<Icon disabled name="clock" size="big" color="blue" />
							<div className="date">{moment(specificEvent.start).format('MMMM d, YYYY HH:mm')}</div>
							<Icon disabled name="minus" size="big" color="blue" />
							<div className="date">{moment(specificEvent.end).format('MMMM d, YYYY HH:mm')}</div>
							{/* {this.eventInfo(specificEvent.authorId)}
						<Button onClick={this.subscribeToAnEvent}>Subscribe</Button>
						<Button onClick={this.unsubscribeToAnEvent}>Unsubscribe</Button> */}
						</div>
						<div
							className="linkToAuthor"
							onClick={() => this.props.history.push(`/user/${specificEvent.authorId}`)}
						>
							@ {specificEvent.author.name}
						</div>
					</React.Fragment>
				)}
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
