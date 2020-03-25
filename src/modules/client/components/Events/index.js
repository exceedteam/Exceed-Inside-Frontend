import React from 'react';
import MyCalendar from '../MyCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchEvents } from '../../../redux/actions/events/fetch';
import Loader from '../Loader';
import { subToAllEvents, unsubToAllEvents } from '../../../redux/actions/events/update';
import { Button } from 'semantic-ui-react';
import './events.scss';

class Events extends React.Component {
	constructor(props) {
		super(props);
		this.decoded = jwtDecode(localStorage.getItem('token')).id;
		this.url = process.env.REACT_APP_API_URL;
		this.token = localStorage.getItem('token');

		this.state = {
			eventsOfUser: [],
			isEventsOfUser: false,
			newEvent: {
				selectedDays: []
			},
			all: 'linkedin',
			my: 'grey'
		};
	}

	// TODO Add filter
	componentDidMount() {
		if (!this.props.events.length) {
			const { fetchEvents } = this.props;
			fetchEvents({
				page: 0,
				perPage: 50
			}).then((events) => {
				const list = events.filter((event) => event.authorId === this.decoded);
				this.setState({ eventsOfUser: list });
			});
		}
	}

	subToAllEvents = () => {
		this.props.subToAllEvents({});
	};

	unsubToAllEvents = () => {
		this.props.unsubToAllEvents({});
	};

	// switch between user events and all events
	handleDataCalendar = (param) => {
		switch (param) {
			case 'All':
				this.setState({ isEventsOfUser: false, all: 'linkedin', my: 'grey' });
				break;
			case 'User':
				this.setState({ isEventsOfUser: true, all: 'grey', my: 'linkedin' });
				break;
			default:
				break;
		}
	};

	visbleLoad = () => {
		const internal = document.getElementById('internal');
		if (this.props.internalLoading) {
			internal.style.display = 'block';
		} else {
			internal.style.display = 'none';
		}
	};

	componentDidUpdate() {
		const eventsOfUser = this.props.events.filter((event) => event.authorId === this.decoded);
		if (eventsOfUser.length !== this.state.eventsOfUser.length || JSON.stringify(eventsOfUser) !== JSON.stringify(this.state.eventsOfUser)) {
			this.setState({ eventsOfUser: eventsOfUser });
		}
	}

	render() {
		const { loading, events, internalLoading } = this.props;
		const { isEventsOfUser, eventsOfUser } = this.state;
		return (
			<div>
				{!loading && (
					<div className="eventContainer">
						<MyCalendar events={!!isEventsOfUser ? eventsOfUser : events} history={this.props.history} />
						<div className="someButton">
							<div className="subscribeContainer">
								<Button onClick={this.subToAllEvents}>
									{internalLoading ? 'loading' : 'Sub to all'}
								</Button>
								<Button onClick={this.unsubToAllEvents}>
									{internalLoading ? 'loading' : 'Unsub to all'}
								</Button>
							</div>
							<div className="radioContainer">
								<Button.Group>
									<Button
										color={this.state.all}
										onClick={() => {
											this.handleDataCalendar('All');
										}}
									>
										All
									</Button>
									<Button.Or />
									<Button
										color={this.state.my}
										onClick={() => {
											this.handleDataCalendar('User');
										}}
									>
										My
									</Button>
								</Button.Group>
							</div>
						</div>
					</div>
				)}
				{loading && <Loader />}
			</div>
		);
	}
}

//connection with redux
const mapStateToProps = (state) => {
	return {
		errors: state.events.errors,
		loading: state.events.loading,
		events: state.events.events,
		internalLoading: state.events.internalLoading
	};
};

export default connect(mapStateToProps, {
	fetchEvents,
	subToAllEvents,
	unsubToAllEvents
})(Events);
