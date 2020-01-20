import React, { useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import { PostHeader } from "../PostHeader";
import styles from "./PostPreview.module.css";

// common function for rendering one height with simpleMDE
const PostPreview = ({ post: currentPost, history, likePost, dislikePost }) => {
  const post = useRef(currentPost);

  const getInstance = editor => {
    // You can now store and manipulate the simplemde instance.
    let { images, text } = post.current;

    // replaces the id of the image with a link in the text
    images.forEach(image => {
      const imageURL = `![](${image.src})`;
      const imageId = `<id:${image.id}>`;
      const fromIdtoImage = new RegExp(imageId);
      text = text.replace(fromIdtoImage, imageURL);
    });
    editor.value(text);
    editor.togglePreview(editor);
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
      <SimpleMDE
        getMdeInstance={getInstance}
        className={styles.content}
        options={{
          toolbar: false,
          status: false
        }}
        onClick={() => history.push(`/post/${post.current.id}`)}
      />
      <div className={styles.likes}>
        <span className={styles.clickable} onClick={setLike}>
          Like:{" "}
        </span>
        {post.current.likeCounter}
        <span className={styles.clickable} onClick={setDislike}>
          Dislike:{" "}
        </span>
        {post.current.dislikeCounter}
        <span>Comments: </span>
        {post.current.commentsCounter}
      </div>
    </div>
  );
};

export default PostPreview;
