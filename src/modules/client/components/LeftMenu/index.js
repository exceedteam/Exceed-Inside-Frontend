import React from "react";
import { Button } from "semantic-ui-react";
import "./leftMenu.scss";
import { Menu } from 'semantic-ui-react';

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'main'
    }
  }
  render() {
    const { history } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu pointing secondary vertical className='leftMenu'>
        <Menu.Item 
          name='Main page'
          active={activeItem === 'main'}
          onClick={() => {this.setState({activeItem: 'main'}); history.push("/")}}
        />
        <Menu.Item 
          name='New post'
          active={activeItem === 'create'}
          onClick={() => {this.setState({activeItem: 'create'}); history.push("/create")}}
        />
        <Menu.Item 
          name='Events'
          active={activeItem === 'events'}
          onClick={() => {this.setState({activeItem: 'events'}); history.push("/events")}}
        />
      </Menu>
    );
  }
}
