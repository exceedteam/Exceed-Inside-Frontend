import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from '../PostPreview';
import CreateComment from '../CreateComment';
import DisplayComments from '../DisplayComments';
import Loader from '../../../common/Loader';


const Post = ({ postId, history, isPostPreview }) => {
  return (
    <div>
      { !!isPostPreview && (
        <div>
          <div>
            {/* render post content with with information about the author */}
            <PostPreview
              postId={postId}
            />
          </div>
          <CreateComment id={postId} />
          {/* render comments of post */}
          <DisplayComments
            postId={postId}
            history={history}
            onClick={() => {
            }}
          />
        </div>
      )}
      { !isPostPreview && <Loader />}
    </div>
  );
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  isPostPreview: PropTypes.bool,
};

Post.defaultProps = {
  isPostPreview: false,
};

export default Post;
