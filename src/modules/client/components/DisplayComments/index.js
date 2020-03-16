// display post comments
import React from 'react';
import { createID } from '../../../../services/helpers';
import { PostHeader } from '../PostHeader';
import { MentionsInput, Mention } from 'react-mentions';
import CreateComment from '../CreateComment';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { fetchComments } from '../../../redux/actions/comments/fetch';
import { Comment } from 'semantic-ui-react';
import moment from "moment";

class DisplayComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisibleInput: false,
			isVisibleSubcomments: false,
			currentCommentId: '',
			subcomments: []
		};
	}

	handleVisible = (id) => {
		this.setState({
			isVisibleInput: !this.state.isVisibleInput,
			currentCommentId: id
		});
	};

	visibleSubcomments = () => {
		this.setState({ isVisibleSubcomments: !this.state.isVisibleSubcomments });
	};

	uploadAnsveredComments = ({ postId, commentId }) => {
		this.props.fetchComments({ id: postId, commentId: commentId });
		this.setState(
			{
				currentCommentId: commentId
			},
			() => {
				console.log('----------callback');
				this.visibleSubcomments();
			}
		);
	};

	renderSubcomments = () => {
		const { comments } = this.props;
		const { currentCommentId } = this.state;
		const subComments = comments.filter((comment) => comment.parent === currentCommentId);

		return (
			<ul>
				{subComments.map((comment) => {
					return <li key={createID()}>{/* header with data about comment author */}</li>;
				})}
			</ul>
		);
	};

	render() {
		const { loading, comments } = this.props;
		const { isVisibleInput, currentCommentId, isVisibleSubcomments } = this.state;

		return (
			<div className="commentsField">
				{!loading && (
					<Comment.Group>
						{comments.filter((comment) => comment.parent === '').map((comment) => (
              <React.Fragment>
								<Comment>
									<Comment.Avatar src={comment.author.avatar} />
									<Comment.Content>
										<Comment.Author
											as="a"
											onClick={() => {
												this.props.history.push(`/user/${comment.authorId}`);
											}}
										>
											{comment.author.name}
										</Comment.Author>
										<Comment.Metadata>
											<div>{moment(comment.createdAt).startOf('day').fromNow()}</div>
										</Comment.Metadata>
										<Comment.Text>{comment.text}</Comment.Text>
										<Comment.Actions>
											<Comment.Action>Reply</Comment.Action>
										</Comment.Actions>
									</Comment.Content>
								</Comment>
								{/* <PostHeader
									name={comment.author.name}
									avatar={comment.author.avatar}
									date={comment.createdAt}
									onClick={() => {
										this.props.history.push(`/user/${comment.authorId}`);
									}}
								/> */}
								<div className="commentInput" onClick={() => this.handleVisible(comment.id)}>
									{/* comment text with metioned users*/}
									<MentionsInput disabled value={comment.text} className="textarea">
										<Mention
											trigger="@"
											displayTransform={(id, display) => {
												return '@' + display;
											}}
										/>
									</MentionsInput>
								</div>
								{comment.answeredUser.length > 0 &&
								!isVisibleSubcomments && (
									<button
										onClick={() => {
											this.uploadAnsveredComments({
												postId: comment.postId,
												commentId: comment.id
											});
										}}
									>
										load more comments
									</button>
								)}
								{isVisibleSubcomments && this.renderSubcomments()}
								{isVisibleInput &&
								currentCommentId === comment.id && (
									<CreateComment
										id={comment.postId}
										withoutParent={false}
										parent={comment.id}
										mention={{
											id: comment.authorId,
											name: comment.author.name
										}}
									/>
								)}
                </React.Fragment>
						))}
					</Comment.Group>
				)}
				{loading && <Loader />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// comments: state.comments.comments,
	};
};

export default connect(mapStateToProps, { fetchComments })(DisplayComments);
