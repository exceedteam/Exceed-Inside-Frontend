import React, { useRef, useEffect } from 'react';
import { PostHeader } from '../PostHeader';
import { Icon, Comment } from 'semantic-ui-react';
import Editor from '../../../libs/Editor';
import jwtDecode from 'jwt-decode';

// common function for rendering one height with simpleMDE
const PostPreview = ({ post: currentPost, history, likePost, dislikePost, isMainPost = false }) => {
	const post = useRef(currentPost);
	const editorInstance = useRef();
	useEffect(
		() => {
			editorInstance.current.$blockEdit.current.style.height = 0;
			// display depending: on the location on the main page or on the page with the post
			const editor = document.querySelectorAll('.for-container');
			if (isMainPost) {
				for (let item of editor) {
					item.style.height = '350px';
				}
			}
		},
		[ isMainPost ]
	);

	const changeLike = () => {
		const token = localStorage.getItem('token');
		const tokenId = jwtDecode(token).id;
		const isLike = post.current.likesUsers.filter((item) => item === tokenId);
		return isLike.length > 0;
	};

	const setLike = () => {
		likePost(post.current.id);
		changeLike();
	};

	const changeDislike = () => {
		const token = localStorage.getItem('token');
		const tokenId = jwtDecode(token).id;
		const isDislike = post.current.dislikesUsers.filter((item) => item === tokenId);
		return isDislike.length > 0;
	};

	const setDislike = () => {
		dislikePost(post.current.id);
		changeDislike();
	};

	return (
		<div className="postPreview">
			<div>
				<PostHeader
					name={post.current.author.name}
					avatar={post.current.author.avatar}
					date={post.current.createdAt}
					onClick={() => history.push(`/user/${post.current.authorId}`)}
				/>
			</div>
			{isMainPost && (
				<div id="gradient1" className="gradient" onClick={() => history.push(`/post/${post.current.id}`)} />
			)}
			<Editor
				ref={editorInstance}
				value={post.current.text}
				language={'en'}
				preview={true}
				images={post.current.images}
				lineNum={false}
				toolbar={{}}
			/>
			<Comment.Group>
				<Comment>
					<Comment.Metadata>
						<div onClick={setLike}>
							<Icon name="thumbs up" color={changeLike() ? 'red' : 'grey'} /> {post.current.likeCounter}
						</div>
						<div onClick={setDislike}>
							<Icon name="thumbs down" color={changeDislike() ? 'red' : 'grey'} />{' '}
							{post.current.dislikeCounter}
						</div>
						<div>
							<Icon name="comment" /> {post.current.commentsCounter}
						</div>
					</Comment.Metadata>
				</Comment>
			</Comment.Group>
		</div>
	);
};

export default PostPreview;
