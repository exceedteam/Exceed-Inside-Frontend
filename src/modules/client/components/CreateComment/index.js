import React from 'react';
import { connect } from 'react-redux';
import { MentionsInput, Mention } from 'react-mentions';
import { createComment } from '../../../redux/actions/comments/create';
import { Button, Icon } from 'semantic-ui-react';

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentText: ''
		};
	}

	componentDidMount() {
		const { mention } = this.props;
		if (mention) {
			this.setState({
				commentText: `@[${mention.name}](${mention.id})`
			});
		}
	}

	// posting a new comment
	newComment = (event) => {
		event.preventDefault();
		const { commentText } = this.state;
		const { id, createComment, parent, withoutParent } = this.props;
		if (!withoutParent) {
			createComment({ commentText, id, parent, withoutParent });
		} else {
			createComment({ commentText, id });
		}
		this.setState({ commentText: '' });
		this.props.replyCallback()
	};

	render() {
		const { commentText } = this.state;
		const { users, type } = this.props;
		return (
			<div className={`createTheNewComment ${type}`}>
				<MentionsInput
					inputRef={this.textarea}
					className="new"
					value={commentText}
					onChange={(event) => this.setState({ commentText: event.target.value })}
				>
					<Mention
						className="mention"
						trigger="@"
						data={users}
						displayTransform={(id, display) => {
							return '@' + display;
						}}
					/>
				</MentionsInput>
				<Button className="sendBtn" onClick={this.newComment}>
					<Icon name='send'/>
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users.users
	};
};

// default props if the following props is undefined
CreateComment.defaultProps = {
  replyCallback: () => {}
};

export default connect(mapStateToProps, { createComment })(CreateComment);
