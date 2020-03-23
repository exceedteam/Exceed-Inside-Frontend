import React from 'react';
import MyCalendar from '../MyCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchEvents } from '../../../redux/actions/events/fetch';
import Loader from '../Loader';
import { subToAllEvents, unsubToAllEvents } from '../../../redux/actions/events/update';
import { Button, Radio } from 'semantic-ui-react';
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
			}
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
				this.setState({ isEventsOfUser: false });
				break;
			case 'User':
				this.setState({ isEventsOfUser: true });
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
								<Radio
									label="All Events"
									name="radioGroup"
									value="User"
									checked={this.state.isEventsOfUser === false}
									onClick={() => {
										this.handleDataCalendar('All');
									}}
								/>
								<Radio
									label="My Events"
									name="radioGroup"
									value="All"
									checked={this.state.isEventsOfUser === true}
									onClick={() => {
										this.handleDataCalendar('User');
									}}
								/>
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
