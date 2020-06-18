/*
  Used to display author information
*/
import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import { typeOfTime } from '../../../../services/helpers';

const PostHeader = ({ avatar, name, date, onClick }) => {
  return (
    <Header className="postHeader">
      <Image circular src={avatar} />
      <div className="info">
        <h4 className="clickable" onClick={onClick}>
          {name}
        </h4>
        {date && <h4 className="date">{typeOfTime(date)}</h4>}
      </div>
    </Header>
  );
};

export { PostHeader };
