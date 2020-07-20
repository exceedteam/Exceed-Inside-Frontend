import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Sidebar, Ref } from 'semantic-ui-react';
import Navbar from '../Navbar';
import AdminProfile from '../AdminProfile';


const CustomSidebar = ({ children }) => {
  const segmentRef = React.useRef();
  return (
    <Sidebar.Pushable as='div'>
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        // onHide={() => setVisible(false)}
        target={segmentRef}
        vertical
        visible
        width='wide'
      >
        <AdminProfile />
        <Navbar />
      </Sidebar>
      <Sidebar.Pusher>
        <Ref innerRef={segmentRef}>
          {children}
        </Ref>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

CustomSidebar.propTypes = {
  children: PropTypes.element.isRequired
};

export default CustomSidebar;
