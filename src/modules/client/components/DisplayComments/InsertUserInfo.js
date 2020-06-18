import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux'
import { createID } from '../../../../services/helpers';

const InsertUserInfo = ({ text }) => {
  const users = useSelector(state => state.users.users)
  const re = /@\[(.+?)\]\(\w+?\)/g;
  return (
    <div className='subcomment'>
      {text.split(re).map((partOfText) => {
        const currentUserDisplayInPopUp = users.find(
          (user) => user.display === partOfText
        );
        if (currentUserDisplayInPopUp) {
          return (
            <Popup
              key={createID()}
              header={currentUserDisplayInPopUp.display}
              content={`${currentUserDisplayInPopUp.team} : ${currentUserDisplayInPopUp.position}`}
              trigger={(
                <div className='mentionUser'>
                  @
                  {partOfText}
                </div>
              )}
              className='miniPopup'
              basic
            />
          );
        }
        return <div key={createID()}>{`${partOfText} `}</div>;
      })}
    </div>
  );
};

InsertUserInfo.propTypes = {
  text: PropTypes.string.isRequired,
}

export default InsertUserInfo
