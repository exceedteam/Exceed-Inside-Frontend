import React from "react";
import { prettyDate } from "../../../../services/helpers";
import SimpleMDE from "react-simplemde-editor";


// common function for rendering one height with simpleMDE
const PostPreview = ({ post }) => {
  console.log("post", post);

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
        <span>{post.author.name}</span>
        <span>{prettyDate(post.createdAt)}</span>
      </div>
      <span>{post.title}</span>
      <SimpleMDE
        getMdeInstance={getIntance}
        className={""}
        options={{
          toolbar: false,
          status: false
        }}
      />
      <div>
        <span>Комментариев: </span>
        {post.commentsCounter}
      </div>
    </div>
  );
};

export { PostPreview };
