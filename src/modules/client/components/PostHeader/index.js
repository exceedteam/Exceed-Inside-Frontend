/*
  Used to display author information
*/
import React from 'react';
import moment from 'moment';
import { Header, Image } from 'semantic-ui-react';

const PostHeader = ({ avatar, name, date, onClick }) => {
	return (
		<Header className="postHeader">
			<Image circular src={avatar}/>
			<div className="info">
				<h4 className="clickable" onClick={onClick}>
					{name}
				</h4>
				{date && <span className="date">{moment(date).format('ddd L HH:mm')}</span>}
			</div>
		</Header>
	);
};

export { PostHeader };
