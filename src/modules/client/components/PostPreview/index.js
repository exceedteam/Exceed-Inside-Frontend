import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';
import { getPostById } from '../../../redux/reducers/posts';
import { dislikePost, likePost } from '../../../redux/actions/posts/edit';

const PostPreviewHoc = ({
                          post,
                          history,
                          // eslint-disable-next-line no-shadow
                          likePost, dislikePost,
                          isMainPost
                        }) => {
  const editorInstance = useRef();
  useEffect(() => {
    editorInstance.current.$blockEdit.current.style.height = 0;
    // display depending: on the location
    // on the main page or on the page with the post
    const editor = document.querySelectorAll('.for-container');
    if (isMainPost) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of editor) {
        item.style.height = '350px';
      }
    }
  }, [ isMainPost ]);
  
  return (
    <PostPreview
      post={post}
      history={history}
      likePost={likePost}
      dislikePost={dislikePost}
      isMainPost={isMainPost}
      ref={editorInstance}
    />
  );
};
PostPreviewHoc.propTypes = {
  post: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  postId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  likePost: PropTypes.func,
  dislikePost: PropTypes.func,
  isMainPost: PropTypes.bool
};

PostPreviewHoc.defaultProps = {
  likePost: () => {
  },
  dislikePost: () => {
  },
  isMainPost: false
};

// connection with redux
const mapStateToProps = (state, ownProps) => {
  return {
    post: getPostById(state.posts, ownProps.postId)
  };
};

export default connect(mapStateToProps, {
  likePost,
  dislikePost
})(
  withRouter(PostPreviewHoc)
);
