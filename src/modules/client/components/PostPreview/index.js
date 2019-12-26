import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { UserHeader} from "../UserHeader"

// common function for rendering one height with simpleMDE
const PostPreview = ({ post, history }) => {
  const getIntance = editor => {
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

  // returns form with post
  return (
    <div>
      <div>
        <UserHeader
          name={post.author.name}
          avatar={post.author.avatar}
          date={post.createdAt}
          onClick={() => history.push(`/user/${post.authorId}`)}
        />
      </div>
      <span>Title: {post.title}</span>
      <SimpleMDE
        getMdeInstance={getIntance}
        className={""}
        options={{
          toolbar: false,
          status: false
        }}
        onClick={() => history.push(`/post/${post.id}`)}
      />
      <div>
        <span>Comments: </span>
        {post.commentsCounter}
      </div>
    </div>
  );
};

export { PostPreview };
