import React from 'react';
import Modal from 'react-modal';
import './modal.scss';
import { Icon, Button, Header } from 'semantic-ui-react';

export default class ModalWindow extends React.Component {
	render() {
		const { handleVisible, isOpen, children, title } = this.props;
		return (
			<Modal
				className="modalContent"
				isOpen={isOpen}
				onRequestClose={handleVisible}
				ariaHideApp={false}
				overlayClassName="overlay"
			>
				<Header as="h1" floated="left" dividing>
					{title}
				</Header>
				<Button onClick={handleVisible} className="closeBtn">
					<Icon name="close" />
				</Button> 
				{children}
			</Modal>
		);
	}
}
