import React, { useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostBottom from './PostBottom';
import {
  dislikePost,
  likePost
} from '../../../redux/actions/posts/edit';
import {
  getLikesInfoByPostId
} from '../../../redux/reducers/posts';


const PostBottomHOC = ({
                         postId,
                         likesUsers,
                         dislikesUsers,
                         likeCounter,
                         dislikeCounter,
                         commentCounter,
                         // eslint-disable-next-line no-shadow
                         likePost, dislikePost
                       }) => {
  const changeColor = useCallback((type) => {
    const token = localStorage.getItem('token');
    const tokenId = jwtDecode(token).id;
    const isLike = likesUsers.filter((item) => item === tokenId);
    const isDislike = dislikesUsers.filter((item) => item === tokenId);
    switch (type) {
      case 'like':
        return isLike.length > 0 ? 'red' : 'grey';
      case 'dislike':
        return isDislike.length > 0 ? 'red' : 'grey';
      default:
        return 'grey';
    }
  }, [ likesUsers, dislikesUsers ]);
  
  const onLike = useCallback(() => {
    likePost(postId);
  }, [ postId, likePost ]);
  
  const onDislike = useCallback(() => {
    dislikePost(postId);
  }, [ postId, dislikePost ]);
  
  return (
    <PostBottom
      commentCounter={commentCounter}
      likeCounter={likeCounter}
      dislikeCounter={dislikeCounter}
      onLike={onLike}
      onDislike={onDislike}
      likeColor={changeColor('like')}
      dislikeColor={changeColor('dislike')}
    />
  );
};

PostBottomHOC.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  postId: PropTypes.string.isRequired,
  likeCounter: PropTypes.number,
  dislikeCounter: PropTypes.number,
  commentCounter: PropTypes.number,
  likesUsers: PropTypes.array,
  dislikesUsers: PropTypes.array,
  likePost: PropTypes.func,
  dislikePost: PropTypes.func
};

PostBottomHOC.defaultProps = {
  likeCounter: 0,
  dislikeCounter: 0,
  commentCounter: 0,
  likesUsers: [],
  dislikesUsers: [],
  likePost: () => {
  },
  dislikePost: () => {
  }
};

const mapStateToProps = (store, ownProps) => {
  const likeInfo = getLikesInfoByPostId(store, ownProps.postId);
  return {
    likeCounter: likeInfo.likeCounter,
    dislikeCounter: likeInfo.dislikeCounter,
    likesUsers: likeInfo.likesUsers,
    dislikesUsers: likeInfo.dislikesUsers,
    commentCounter: likeInfo.commentCounter
  };
};

export default connect(mapStateToProps, {
  likePost,
  dislikePost
})(PostBottomHOC);
