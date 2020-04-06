// display post comments
import React from 'react';
import { createID, typeOfTime, togglePropertyInSet } from '../../../../services/helpers';
import CreateComment from '../CreateComment';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { fetchComments } from '../../../redux/actions/comments/fetch';
import { Comment, Popup, Button, Image } from 'semantic-ui-react';
import moment from 'moment';

class DisplayComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisibleInput: false,
			idsOfCommentsIsShown: new Set([]),
			currentCommentId: '',
			params: {
				page: 1,
				perPage: 10
			},
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

	// display message with mentioned users
	replaceId = (text) => {
		const re = /@\[(.+?)\]\(\w+?\)/g;
		const { users } = this.props;
		return (
			<div className="subcomment">
				{text.split(re).map((partOfText) => {
					const currentUserDisplayInPopUp = users.find((user) => user.display === partOfText);
					if (currentUserDisplayInPopUp) {
						return (
							<Popup
								key={createID()}
								header={currentUserDisplayInPopUp.display}
								content={moment(currentUserDisplayInPopUp.age).format('LL')}
								trigger={<div className="mentionUser">@{partOfText} </div>}
								className="miniPopup"
								basic
							/>
						);
					} else {
						return <div key={createID()}>{partOfText + ' '}</div>;
					}
				})}
			</div>
		);
	};

	renderSubcomments = (currentCommentId) => {
		const { comments, loading } = this.props;
		const { currentCommentId: onClickComment } = this.state;
		const subComments = comments.filter((comment) => comment.parent === currentCommentId);
		return (
			<React.Fragment>
				<Comment.Group>
					{subComments.map((comment) => {
						return (
							<Comment key={createID()}>
								<Comment.Avatar as={Image} src={comment.author.avatar} size="tiny" circular />
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
									<Comment.Text>{this.replaceId(comment.text)}</Comment.Text>
								</Comment.Content>
							</Comment>
						);
					})}
				</Comment.Group>
				{loading && onClickComment === currentCommentId && <Loader />}
			</React.Fragment>
		);
	};

	//pagination
	changePage = () => {
		const { params } = this.state;
		this.setState({
			params: {
				...params,
				page: params.page + 1
			}
		});
		this.recieveComments();
	};

	recieveComments = () => {
		const { fetchComments } = this.props;
		fetchComments({ ...this.state.params, id: this.props.comments[0].postId });
	};

	render() {
		const { comments } = this.props;
		const { isVisibleInput, currentCommentId, idsOfCommentsIsShown } = this.state;
		return (
			<div className="commentsField">
				<Comment.Group threaded>
					{comments.filter((comment) => comment.parent === '').map((comment) => (
						<React.Fragment key={createID()}>
							<Comment>
								<Comment.Avatar as={Image} src={comment.author.avatar} size="tiny" circular />
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
									<Comment.Text>{this.replaceId(comment.text)}</Comment.Text>
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
									replyCallback={()=> {idsOfCommentsIsShown.add(currentCommentId)}}
									type={'Reply'}
									mention={{
										id: comment.authorId,
										name: comment.author.name
									}}
								/>
							)}
						</React.Fragment>
					))}
					<Button className="receive" onClick={() => this.changePage()} primary>
						Receive Comments
					</Button>
				</Comment.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.comments.loading,
		users: state.users.users
	};
};

export default connect(mapStateToProps, { fetchComments })(DisplayComments);
