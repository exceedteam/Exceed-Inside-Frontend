import React, { useCallback } from 'react';
import { Icon, Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';


// common function for rendering one height with simpleMDE
const PostBottom = ({
                      onLike,
                      onDislike,
                      likeColor,
                      dislikeColor,
  
                      likeCounter,
                      dislikeCounter,
                      commentCounter
                    }) => {
  

  
  const onLikeFunc = useCallback(() => {
    onLike()
  }, [onLike]);
  
  
  const onDislikeFunc = useCallback(() => {
    onDislike()
  }, [onDislike]);
  
  return (
    <Comment.Group>
      <Comment>
        <Comment.Metadata>
          <div onClick={onLikeFunc}>
            <Icon
              name='thumbs up'
              color={likeColor}
            />
            {' '}
            {likeCounter}
          </div>
          <div onClick={onDislikeFunc}>
            <Icon
              name='thumbs down'
              color={dislikeColor}
            />
            {' '}
            {dislikeCounter}
          </div>
          <div>
            <Icon name='comment' />
            {' '}
            {commentCounter}
          </div>
        </Comment.Metadata>
      </Comment>
    </Comment.Group>
  );
};

PostBottom.propTypes = {
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  
  likeColor: PropTypes.string,
  dislikeColor: PropTypes.string,
  

  likeCounter: PropTypes.number.isRequired,
  dislikeCounter: PropTypes.number.isRequired,
  commentCounter: PropTypes.number.isRequired
};

PostBottom.defaultProps = {
  onLike: () => {
  },
  onDislike: () => {
  },
  likeColor: 'grey',
  dislikeColor: 'grey',
};

export default PostBottom;
