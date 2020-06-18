import React from 'react';
import PropTypes from 'prop-types';
import { PostHeader } from '../PostHeader';
import PostBottomHOC from '../PostBottom';
import Editor from '../../../libs/Editor';

// common function for rendering one height with simpleMDE
const PostPreview = React.forwardRef(({
                                        post,
                                        history,
                                        isMainPost
                                      }, ref) => {
  return (
    <div className='postPreview'>
      <div>
        <PostHeader
          name={post.author.name}
          avatar={post.author.avatar}
          date={post.createdAt}
          onClick={() => history.push(`/user/${post.authorId}`)}
        />
      </div>
      {isMainPost && (
        <div
          id='gradient1'
          className='gradient'
          onClick={() => history.push(`/post/${post.id}`)}
        />
      )}
      <Editor
        ref={ref}
        value={post.text}
        language='en'
        preview
        images={post.images}
        lineNum={false}
        toolbar={{}}
      />
      <PostBottomHOC
        postId={post.id}
      />
    </div>
  );
});

PostPreview.propTypes = {
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  isMainPost: PropTypes.bool.isRequired
};

export default PostPreview;
