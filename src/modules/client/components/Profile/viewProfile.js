import React from 'react';
import moment from 'moment';
import { Image, Header, Icon } from 'semantic-ui-react';

export default class ViewProfile extends React.Component {
  render() {
    const {
      avatar,
      firstName,
      lastName,
      email,
      age,
      position,
      team,
      aboutInfo
    } = this.props.profileData;
    const { id } = this.props;
    return (
      <>
        <Image size="small" rounded src={avatar} className="avatar" />
        <Header dividing>
          {firstName} 
          {' '}
          {lastName}
          {' '}
        </Header>
        {team && position && (
          <div className="team">
            {team}
            :
            {position}
          </div>
        )}
        <div className="about">{aboutInfo}</div>
        <div className="contactInformation">
          <div className="birthday">
            <Icon color="blue" name="calendar alternate" />
            <span>{moment(age).format('MMMM D, YYYY')}</span>
          </div>
          <div className="mail">
            <Icon color="blue" name="mail" />
            <span>{email}</span>
          </div>
          <div
            className="posts"
            onClick={() => {
              this.props.history.push(`/user/${id}/posts`);
            }}
          >
            <Icon color="blue" name="paste" />
            <span>Posts of User</span>
          </div>
        </div>
      </>
    );
  }
}
