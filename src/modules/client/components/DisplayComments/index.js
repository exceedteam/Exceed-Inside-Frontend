// display post comments
import React from 'react';
import { createID, typeOfTime, togglePropertyInSet } from '../../../../services/helpers';
import CreateComment from '../CreateComment';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { fetchComments } from '../../../redux/actions/comments/fetch';
import { Comment } from 'semantic-ui-react';

class DisplayComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisibleInput: false,
			idsOfCommentsIsShown: new Set([]),
			currentCommentId: ''
		};
	}

	// window display function for responding to a comment
	handleVisible = (id) => {
		this.setState({
			isVisibleInput: !this.state.isVisibleInput,
			currentCommentId: id
		});
	};

	uploadAnsveredComments = ({ postId, commentId }) => {
		const filteredComments = this.props.comments.filter((comment) => commentId === comment.parent);
		if (!filteredComments.length) {
			this.props.fetchComments({ id: postId, commentId: commentId });
		}
		let { idsOfCommentsIsShown } = this.state;

		idsOfCommentsIsShown = togglePropertyInSet(idsOfCommentsIsShown, commentId);

		this.setState({
			idsOfCommentsIsShown,
			currentCommentId: commentId
		});
	};

	renderSubcomments = (currentCommentId) => {
		const { comments, loading } = this.props;
		const { currentCommentId: onClickComment } = this.state;
		const subComments = comments.filter((comment) => comment.parent === currentCommentId);
		return (
			<div>
					<Comment.Group>
						{subComments.map((comment) => {
							return (
								<Comment key={createID()}>
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
											<div>{typeOfTime(comment.createdAt)}</div>
										</Comment.Metadata>
										<Comment.Text>{comment.text}</Comment.Text>
									</Comment.Content>
								</Comment>
							);
						})}
					</Comment.Group>
				{loading && onClickComment === currentCommentId && <Loader />}
			</div>
		);
	};

	render() {
		const { comments } = this.props;
		const { isVisibleInput, currentCommentId, idsOfCommentsIsShown } = this.state;
		return (
			<div className="commentsField">

				<Comment.Group>
					{comments.filter((comment) => comment.parent === '').map((comment) => (
						<React.Fragment key={createID()}>
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
										<div>{typeOfTime(comment.createdAt)}</div>
									</Comment.Metadata>
									<Comment.Text>{comment.text}</Comment.Text>
									<Comment.Actions>
										<Comment.Action onClick={() => this.handleVisible(comment.id)}>
											Reply
										</Comment.Action>
										{comment.answeredUser.length > 0 && (
											<Comment.Action
												onClick={() => {
													this.uploadAnsveredComments({
														postId: comment.postId,
														commentId: comment.id
													});
												}}
											>
												{`${idsOfCommentsIsShown.has(comment.id)
													? 'Hide'
													: 'Show'} replied messages`}
											</Comment.Action>
										)}
									</Comment.Actions>
								</Comment.Content>
								{idsOfCommentsIsShown.has(comment.id) && this.renderSubcomments(comment.id)}
							</Comment>
							{isVisibleInput &&
							currentCommentId === comment.id && (
								<CreateComment
									id={comment.postId}
									withoutParent={false}
									parent={comment.id}
									type={'Reply'}
									mention={{
										id: comment.authorId,
										name: comment.author.name
									}}
								/>
							)}
						</React.Fragment>
					))}
				</Comment.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.comments.loading,
	};
};

export default connect(mapStateToProps, { fetchComments })(DisplayComments);
