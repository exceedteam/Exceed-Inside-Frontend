import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import './TabMenu.scss';

const TabMenu = ({ tabs }) => {
  return (
    <div className='tab-menu_container'>
      <Tab
        menu={{ secondary: true }}
        panes={tabs}
      />
    </div>
  );
};

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    menuItem: PropTypes.string,
    render: PropTypes.func
  })).isRequired
};

export default TabMenu;
