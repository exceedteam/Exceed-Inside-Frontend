import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import './Navbar.scss';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Navbar = () => (
  <>
  
    {/* <Menu.Item as={Link} to='/admin/dashboard'> */}
    {/*  Dashboard */}
    {/*  <Icon name='home' /> */}
    {/* </Menu.Item> */}
    <Menu.Item as={Link} to='/admin/list'>
      <Icon name='users' />
      Users
    </Menu.Item>
    {/* <Menu.Item as={Link} to='/admin/posts'> */}
    {/*  <Icon name='sticky note' /> */}
    {/*  Posts */}
    {/* </Menu.Item> */}
    {/* <Menu.Item as={Link} to='/admin/comments'> */}
    {/*  Comments */}
    {/*  <Icon name='comments' /> */}
    {/* </Menu.Item> */}
    {/* <Menu.Item as={Link} to='/admin/Events'> */}
    {/*  Events */}
    {/*  <Icon name='calendar alternate' /> */}
    {/* </Menu.Item> */}
  </>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
