import React from "react";
import "./leftMenu.scss";
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router'

class LeftMenu extends React.Component {
  
  render() {
    const { pathname } = this.props.history.location;
    const { history } = this.props;
    return (
      <Menu pointing secondary vertical className='leftMenu'>
        <Menu.Item 
          name='Main page'
          active={pathname === '/'}
          onClick={() => history.push("/")}
        />
        <Menu.Item 
          name='New post'
          active={pathname === '/create'}
          onClick={() => history.push("/create")}
        />
        <Menu.Item 
          name='Events'
          active={pathname === '/events'}
          onClick={() => history.push("/events")}
        />
        <Menu.Item 
          name='GoogleCalendar'
          active={pathname === '/calendar'}
          onClick={() => history.push("/calendar")}
        />
      </Menu>
    );
  }
}

export default withRouter(LeftMenu);