import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import PostPreview from '../PostPreview';
import CreateComment from '../CreateComment';
import DisplayComments from '../DisplayComments';
import Loader from '../../../common/Loader';
import './Post.scss'

const Post = ({ postId, history, isPostPreview }) => {
  return (
    <div className='post-page'>
      { !!isPostPreview && (
        <div className='post-feed'>
          {/* render post content with with information about the author */}
          <PostPreview
            postId={postId}
          />
          <div className='comments-section'>
            <CreateComment id={postId} />
            {/* render comments of post */}
            <DisplayComments
              postId={postId}
              history={history}
              onClick={() => {
              }}
            />
          </div>
        
        </div>
      )}
      { !isPostPreview && <Loader />}
      <div className='calendar'>
        <Calendar />
      </div>
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
