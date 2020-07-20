import React from 'react';
import './profile.scss';
import { Image, Form, Icon } from 'semantic-ui-react';
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
    el.style.cssText = `height:${15 + el.scrollHeight}px`;
  };
  
  render() {
    const {
      avatar,
      firstName,
      lastName,
      email,
      age,
      aboutInfo,
      position,
      team
    } = this.props.profileData;
    const { isEdit } = this.state;
    return (
      <>
        <Image size='small' rounded src={avatar} className='avatar' />
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              label='First name'
              id='firstName'
              value={firstName || ''}
              disabled={!isEdit}
              onChange={this.props.updateForm}
              placeholder='firstName'
            />
            <Form.Input
              label='Last name'
              id='lastName'
              value={lastName || ''}
              disabled={!isEdit}
              onChange={this.props.updateForm}
              placeholder='lastName'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Team'
              id='team'
              value={team || ''}
              disabled={!isEdit}
              onChange={this.props.updateForm}
              placeholder='Team'
            />
            <Form.Input
              label='Position'
              id='position'
              value={position || ''}
              disabled={!isEdit}
              onChange={this.props.updateForm}
              placeholder='Position'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Icon color='blue' name='calendar alternate' />
            <DatePicker
              selected={new Date(age)}
              onChange={this.props.updateForm}
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              className='calendarPicker'
              dateFormat='dd-MM-yyyy'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Icon color='blue' name='mail' />
            <Form.Input
              id='email'
              value={email || ''}
              disabled={!isEdit}
              onChange={this.props.updateForm}
              placeholder='e-mail'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.TextArea
              label='About'
              onKeyPress={this.autosize}
              id='aboutInfo'
              disabled={!isEdit}
              onChange={this.props.updateForm}
              value={aboutInfo || ''}
              className='aboutTextarea'
            />
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default EditProfile;
