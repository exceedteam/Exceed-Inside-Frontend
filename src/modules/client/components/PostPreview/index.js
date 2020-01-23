import React, { useRef, useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import { PostHeader } from "../PostHeader";
import styles from "./PostPreview.module.css";

// common function for rendering one height with simpleMDE
const PostPreview = ({
  post: currentPost,
  history,
  likePost,
  dislikePost,
  isMainPost = false
}) => {
  const post = useRef(currentPost);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const codeMirrorCode = document.querySelectorAll(".CodeMirror-code");

    if (isMainPost) {
      const codeMirror = document.querySelectorAll(".CodeMirror");
      for (let item of codeMirror) {
        item.style.height = height + "px";
        item.style.border = "none";
      }
      for (let item of codeMirrorCode) {
        item.style.fontSize = "0px";
      }
    } else {
      const codeMirror = document.querySelectorAll(".CodeMirror")[0];
      codeMirror.style.border = "none";
      codeMirror.style.height = codeMirror.scrollHeight + height - 32 + "px";
    }
  }, [height, isMainPost]);

  const getHeight = () => {
    const collectionImages = document.querySelectorAll(
      ".CodeMirror div.editor-preview-full img"
    );

    function getImgDimension(img) {
      var i = new Image();
      i.src = img.src;
      return {
        width: img.width,
        height: img.height
      };
    }
    for (let item of collectionImages) {
      item.addEventListener("load", function() {
        setHeight(getImgDimension(this).height);
      });
    }
  };

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

    if (isMainPost) {
      setHeight(350);
    } else {
      getHeight();
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
            <span onClick={() => history.push(`/post/${post.current.id}`)}>
              Show full post
            </span>
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
