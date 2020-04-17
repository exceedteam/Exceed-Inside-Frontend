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
			all: true,
			my: false
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
				this.setState({ isEventsOfUser: false, all: true, my: false });
				break;
			case 'User':
				this.setState({ isEventsOfUser: true, all: false, my: true });
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
		const cameArr = this.props.events.filter((event) => event.authorId === this.decoded);
		const currentArr = this.state.eventsOfUser;
		if (cameArr.length !== currentArr.length || JSON.stringify(cameArr) !== JSON.stringify(currentArr)) {
			this.setState({ eventsOfUser: cameArr });
		}
	}

	render() {
		const { loading, events, internalLoading } = this.props;
		const { isEventsOfUser, eventsOfUser } = this.state;
		return (
			<div className="eventContainer">
				{!loading && (
					<React.Fragment>
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
										primary={this.state.all}
										onClick={() => {
											this.handleDataCalendar('All');
										}}
									>
										All
									</Button>
									<Button.Or />
									<Button
										primary={this.state.my}
										onClick={() => {
											this.handleDataCalendar('User');
										}}
									>
										My
									</Button>
								</Button.Group>
							</div>
						</div>
					</React.Fragment>
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
