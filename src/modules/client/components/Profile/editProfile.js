import React from 'react';
import './profile.scss';
import { Image, Input, Icon, TextArea } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: this.props.isEdit
		};
	}

	componentDidMount() {
		const textarea = document.querySelector('textarea');
		textarea.addEventListener('keydown', this.autosize);
	}

	autosize = (e) => {
		const el = e.currentTarget;
		el.style.cssText = 'height:auto; padding:0';
		el.style.cssText = 'height:' + (15 + el.scrollHeight) + 'px';
	};

	render() {
		const { avatar, firstName, lastName, email, age, aboutInfo, position, team } = this.props.profileData;
		const { isEdit } = this.state;
		return (
			<React.Fragment>
				<Image size="small" rounded src={avatar} className="avatar" />
				<div className="row">
					<Input
						id="firstName"
						value={firstName || ''}
						disabled={!isEdit}
						onChange={this.props.updateForm}
						placeholder="firstName"
					/>
					<Input
						id="lastName"
						value={lastName || ''}
						disabled={!isEdit}
						onChange={this.props.updateForm}
						placeholder="lastName"
					/>
				</div>
				<div className="row">
					<Input
						id="team"
						value={team || ''}
						disabled={!isEdit}
						onChange={this.props.updateForm}
						placeholder="Team"
					/>
					<Input
						id="position"
						value={position || ''}
						disabled={!isEdit}
						onChange={this.props.updateForm}
						placeholder="Position"
					/>
				</div>
				<div className="widthDescription">
					<Icon color="blue" name="calendar alternate" />
					<DatePicker
						selected={new Date(age)}
						onChange={this.props.updateForm}
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						className="calendarPicker"
					/>
				</div>
				<div className="widthDescription">
					<Icon color="blue" name="mail" />
					<Input
						id="email"
						value={email || ''}
						disabled={!isEdit}
						onChange={this.props.updateForm}
						placeholder="e-mail"
					/>
				</div>
				<div className="aboutInfo">
					<span>About</span>
					<TextArea
						onKeyPress={this.autosize}
						id="aboutInfo"
						disabled={!isEdit}
						onChange={this.props.updateForm}
						value={aboutInfo || ''}
						className="aboutTextarea"
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default EditProfile;
