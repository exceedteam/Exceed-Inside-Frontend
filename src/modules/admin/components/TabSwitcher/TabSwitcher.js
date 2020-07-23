import React  from 'react';
import { Tab } from 'semantic-ui-react';
import TabMenu from '../TabMenu';
import './TabSwitcher.scss';
import AccountPane from '../AccountsPane';


const TabSwitcher = () => {
  const tabs = [
    {
      menuItem: 'Accounts',
      render: () => <AccountPane />
    },
    {
      menuItem: 'Posts',
      render: () => <Tab.Pane vertical attached={false}>Posts</Tab.Pane>
    },
    {
      menuItem: 'Comments',
      render: () => <Tab.Pane vertical attached={false}>Comments</Tab.Pane>
    }
  ];
  
  
  return (
    <div className='tab-switcher_container'>
      <TabMenu tabs={tabs} />
    </div>
  );
};

export default TabSwitcher;

