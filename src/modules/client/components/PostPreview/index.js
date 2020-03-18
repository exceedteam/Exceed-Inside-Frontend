import React, { useRef, useEffect } from 'react';
import { PostHeader } from '../PostHeader';
import { Icon, Comment } from 'semantic-ui-react';
import Editor from '../../../libs/Editor';

// common function for rendering one height with simpleMDE
const PostPreview = ({ post: currentPost, history, likePost, dislikePost, isMainPost = false }) => {
	const post = useRef(currentPost);
	const editorInstance = useRef();
	useEffect(
		() => {

			console.log('----------editorInstance.current.$blockEdit.current.style.height = 0', );
			editorInstance.current.$blockEdit.current.style.height = 0
			// display depending: on the location on the main page or on the page with the post
			const editorPanel = document.querySelectorAll('.for-panel');
			const editor = document.querySelectorAll('.for-container');
			if (isMainPost) {
				for (let item of editor) {
					item.style.height = '350px';
				}
				for (let item of editorPanel) {
					item.style.overflow = 'hidden';
				}
			}
			for (let item of editor) {
				item.style.width = '98%';
				item.style.border = 'none';
				item.style.boxShadow = '0 0 0 0'
				item.style.overflow = 'hidden';
				item.style.background = '#FFFFFF';
			}
		},
		[ isMainPost ]
	);

	const setLike = () => {
		likePost(post.current.id);
	};

	const setDislike = () => {
		dislikePost(post.current.id);
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
				<div id="gradient1" className="gradient">
					<div className="seeTitle">
						<span onClick={() => history.push(`/post/${post.current.id}`)}>Show full post</span>
					</div>
				</div>
			)}
			<Editor
					ref={editorInstance}
					value={post.current.text}
					language={'en'}
					preview={true}
					images={post.current.images}
					lineNum={false}
					toolbar={{}}
					className="editorPreview"
				/>
			<Comment.Group>
				<Comment>
					<Comment.Metadata>
						<div onClick={setLike}>
							<Icon name="thumbs up" /> {post.current.likeCounter}
						</div>
						<div onClick={setDislike}>
							<Icon name="thumbs down" /> {post.current.dislikeCounter}
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
