import React from 'react';
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
			startDate: this.props.start,
			endDate: this.props.end,
			title: '' || this.props.title
		};
	}

	// save data about new event on state
	updateDataOfEvent = (event) => {
		const newState = this.state;
		newState[event.target.id] = event.target.value;
		this.setState({ ...newState });
	};

	// create or update events
	submitPost = () => {
		const { title, startDate, endDate } = this.state;

		//edit
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

			// create
			this.props.createEvent({
				title: title || 'Default Title',
				start: startDate,
				end: endDate
			});
		}
		this.props.handleVisibleEvent();
	};

	render() {
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
						timeIntervals={30}
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
						timeIntervals={30}
						timeCaption="time"
						dateFormat="MMMM d, yyyy HH:mm"
					/>
				</div>
				<Button onClick={this.submitPost} primary>
					{this.props.button}
				</Button>
				{this.props.title && (
					<Button onClick={this.props.handleVisibleInfo} className="backBtn">
						<Icon name="reply" />
					</Button>	
				)}
			</div>
		);
	}
}

//connection with redux
export default connect(null, { createEvent, editEvent })(CreateEvent);
