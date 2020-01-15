import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { PostHeader } from "../PostHeader"
import styles from "./PostPreview.module.css"
import axios from "axios";

// common function for rendering one height with simpleMDE
const PostPreview = ({ post, history, loading, errors }) => {
  const getInstance = editor => {
    // You can now store and manipulate the simplemde instance.
    let { images, text } = post;

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
  
  //TODO move to redux
  const setLike = () => {
    const url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    axios.put(`${url}/post/${post.id}/like`, {}, { headers: { authorization: token } }).then();
  };
  
  const setDislike = () => {
    const url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    axios.put(`${url}/post/${post.id}/dislike`, {}, { headers: { authorization: token } }).then();
  };
  
  return (
    <div className={styles.post}>
      <div>
        <PostHeader
          name={post.author.name}
          avatar={post.author.avatar}
          date={post.createdAt}
          onClick={() => history.push(`/user/${post.authorId}`)}
        />
      </div>
      <SimpleMDE
        getMdeInstance={getInstance}
        className={styles.content}
        options={{
          toolbar: false,
          status: false
        }}
        onClick={() => history.push(`/post/${post.id}`)}
      />
      <div className={styles.likes}>
        <span className={styles.clickable} onClick={setLike}>Like: </span>
        {post.likeCounter}
        <span className={styles.clickable} onClick={setDislike}>Dislike: </span>
        {post.dislikeCounter}
      </div>
    </div>
  );
};


export default PostPreview;