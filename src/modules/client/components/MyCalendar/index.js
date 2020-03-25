import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CreateEvent from '../CreateEvent';
import AboutEvent from '../AboutEvent';
import ModalWindow from '../Modal';
import { connect } from 'react-redux';
import { editEvent } from '../../../redux/actions/events/update';
import './myCalendar.scss';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

// start of week from monday
moment.locale('ko', {
	week: {
		dow: 1,
		doy: 1
	}
});

class MyCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: '',
			modal: false,
			specificEvent: {},
			start: Date(),
			end: Date()
		};
	}

	// create the new event
	handleSelect = ({ start, end }) => {
		this.setState({ start: start, end: end, modal: true, isModal: 'create' });
	};

	// info about selected event
	handleVisibleInfo = () => {
		this.setState({ isModal: 'about' });
	};

	// edit selected event
	handleVisibleEdit = () => {
		this.setState({ isModal: 'edit' });
	};

	// close modal window with info about event
	closeModal = () => {
		this.setState({ modal: false });
	};

	// Allows you to change the time intervals of the event
	moveEvent = ({ event, start }) => {
		const oldEnd = event.end;
		const oldStart = event.start;
		const minutes = moment(oldEnd).diff(moment(oldStart), 'minutes');
		const newEnd = moment(start).add(minutes, 'minutes').toDate();
		const updatedEvent = { ...event, start, end: newEnd };
		this.props.editEvent({
			event: updatedEvent,
			id: event.id
		});
	};

	resizeEvent = ({ event, start, end }) => {
		const updatedEvent = { ...event, start, end };
		this.props.editEvent({
			event: updatedEvent,
			id: event.id
		});
	};

	// switching between content in modal window
	hadle = (type) => {
		const { specificEvent, modal } = this.state;
		const { start, end, title, id } = specificEvent;
		const { history } = this.props;
		switch (type) {
			case 'edit':
				return (
					<ModalWindow title={'Edit Event'} isOpen={modal} handleVisible={this.closeModal}>
						<CreateEvent
							history={history}
							start={start}
							end={end}
							title={title}
							handleVisibleEvent={this.closeModal}
							handleVisibleInfo={this.handleVisibleInfo}
							id={id}
							button={'Edit Event'}
						/>
					</ModalWindow>
				);
			case 'create':
				return (
					<ModalWindow title={'Create Event'} isOpen={modal} handleVisible={this.closeModal}>
						<CreateEvent
							history={history}
							start={this.state.start}
							end={this.state.end}
							handleVisibleEvent={this.closeModal}
							button={'Create Event'}
						/>
					</ModalWindow>
				);
			case 'about':
				return (
					<ModalWindow title={'About Event'} isOpen={modal} handleVisible={this.closeModal}>
						<AboutEvent
							specificEvent={specificEvent}
							handleVisibleInfo={this.closeModal}
							modal={this.state}
							history={this.props.history}
							handleVisibleEdit={this.handleVisibleEdit}
						/>
					</ModalWindow>
				);
			default:
				break;
		}
	};

	render() {
		const { events } = this.props;
		return (
			<div className="selectableDate">
				<DragAndDropCalendar
					selectable
					resizable
					localizer={localizer}
					onSelectSlot={this.handleSelect}
					events={events.map((event) => {
						return {
							...event,
							end: moment(event.end).toDate(),
							start: moment(event.start).toDate()
						};
					})}
					onEventResize={this.resizeEvent}
					onEventDrop={this.moveEvent}
					popup
					onSelectEvent={(event) => {
						this.setState({ specificEvent: event, modal: true }, this.handleVisibleInfo);
					}}
				/>
				{this.hadle(this.state.isModal)}
			</div>
		);
	}
}

export default connect(null, { editEvent })(MyCalendar);
