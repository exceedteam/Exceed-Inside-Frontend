import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createEvent } from '../../../redux/actions/events/create';
import { editEvent } from '../../../redux/actions/events/update';
import './createEvent.scss';
import { Button, Input, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eventData: {
				title: '' || this.props.title,
				startDate: this.props.start,
				startTime: moment(this.props.start).format('HH:mm'),

				endDate: this.props.end,
				endTime: moment(this.props.end).format('HH:mm')
			},
			startDate: this.props.start,
			endDate: this.props.end,
			title: '' || this.props.title
		};
	}

	// save data about new event on state
	updateDataOfEvent = (event) => {
		const newState = this.state.eventData;
		newState[event.target.id] = event.target.value;
		this.setState({ ...newState });
	};

	submitPost = () => {
		const { title, startDate, endDate } = this.state;

		if (this.props.title) {
			this.props.editEvent({
				event: {
					title: title,
					start: startDate,
					end: endDate
				},
				id: this.props.id
			});
		} else {
			this.props.createEvent({
				title: title,
				start: startDate,
				end: endDate
			});
		}
		this.props.handleVisibleEvent();
	};

	render() {
		console.log('----------this.state.title', this.state.title);
		const { title, startDate, endDate } = this.state;
		return (
			<div className="createForm">
				<Input
					className="titleOfEvent"
					id="title"
					type="text"
					name="name"
					value={title || ''}
					onChange={this.updateDataOfEvent}
					placeholder="Title"
				/>
				<div className="changeTime">
					<Icon disabled name="clock" size="big" color="blue" />
					<DatePicker
						className="calendar"
						selected={startDate}
						onChange={(date) => this.setState({ startDate: date })}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="MMMM d, yyyy HH:mm"
					/>
					<Icon disabled name="minus" size="big" color="blue" />
					<DatePicker
						className="calendar"
						selected={endDate}
						onChange={(date) => this.setState({ endDate: date })}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="MMMM d, yyyy HH:mm"
					/>
				</div>
				<Button onClick={this.submitPost} primary>
					{this.props.button}
				</Button>
			</div>
		);
	}
}

//connection with redux
export default connect(null, { createEvent, editEvent })(CreateEvent);
