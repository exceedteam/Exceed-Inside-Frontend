import React, { useRef, useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { PostHeader } from '../PostHeader';
import { replaceImg } from '../../../../services/helpers';
import styles from './PostPreview.module.css';
import { Card, Icon, Comment } from 'semantic-ui-react';

// common function for rendering one height with simpleMDE
const PostPreview = ({ post: currentPost, history, likePost, dislikePost, isMainPost = false }) => {
	const post = useRef(currentPost);
	const [ height, setHeight ] = useState(0);

	useEffect(
		() => {
			// display depending: on the location on the main page or on the page with the post
			const codeMirrorCode = document.querySelectorAll('.CodeMirror-code');
			if (isMainPost) {
				const codeMirror = document.querySelectorAll('.CodeMirror');
				for (let item of codeMirror) {
					item.style.height = height + 'px';
					item.style.border = 'none';
				}
				for (let item of codeMirrorCode) {
					item.style.fontSize = '0px';
				}
			} else {
				const codeMirror = document.querySelector('.CodeMirror');
				codeMirror.style.border = 'none';
				codeMirror.style.height = codeMirror.scrollHeight + height - 32 + 'px';
			}
		},
		[ height, isMainPost ]
	);

	// You can now store and manipulate the simplemde instance.
	const getInstance = (editor) => {
		let { images, text } = post.current;
		text = replaceImg({ type: 'img', text, images });
		editor.value(text);
		editor.togglePreview(editor);

		// display depending: on the location on the main page or on the page with the post
		if (isMainPost) {
			setHeight(350);
		} else {
			const collectionImages = document.querySelectorAll('.CodeMirror div.editor-preview-full img');
			// getting post image sizes
			function getImgDimension(img) {
				const i = new Image();
				i.src = img.src;
				return {
					width: img.width,
					height: img.height
				};
			}
			for (let item of collectionImages) {
				item.addEventListener('load', function() {
					setHeight(getImgDimension(this).height);
				});
			}
		}
	};

	const setLike = () => {
		likePost(post.current.id);
	};

	const setDislike = () => {
		dislikePost(post.current.id);
	};

	return (
		<div className={styles.post}>
			<div>
				<PostHeader
					name={post.current.author.name}
					avatar={post.current.author.avatar}
					date={post.current.createdAt}
					onClick={() => history.push(`/user/${post.current.authorId}`)}
				/>
			</div>
			{isMainPost && (
				<div id="gradient1" className={styles.gradient}>
					<div className={styles.seeTitle}>
						<span onClick={() => history.push(`/post/${post.current.id}`)}>Show full post</span>
					</div>
				</div>
			)}
			<SimpleMDE
				getMdeInstance={getInstance}
				className={styles.content}
				options={{
					toolbar: false,
					status: false,
					previewClass: styles.textarea
				}}
			/>
			{/* <Card header="Some header" image={post.current.images[0]} description={post.current.text} /> */}
			{/* <Comment>
				<Comment.Actions>
					<Comment.Action>Reply</Comment.Action>
				</Comment.Actions>
				<Comment.Metadata>
					<div onClick={setLike}>Like: {post.current.likeCounter}</div>
					<div onClick={setLike}>Dislike: {post.current.dislikeCounter}</div>
					<div>Comments: {post.current.commentsCounter}</div>
				</Comment.Metadata>
			</Comment> */}
			<div className={styles.likes}>
				<span className={styles.clickable} onClick={setLike}>
					Like:{' '}
				</span>
				{post.current.likeCounter}
				<span className={styles.clickable} onClick={setDislike}>
					Dislike:{' '}
				</span>
				{post.current.dislikeCounter}
				<span>Comments: </span>
				{post.current.commentsCounter}
			</div>
		</div>
	);
};

export default PostPreview;
