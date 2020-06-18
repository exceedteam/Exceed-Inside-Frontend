/*
  Display of a specific post with comments
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPost,
  subscribeCommentCounter,
  subscribeLikes,
  unsubscribeCommentCounter,
  unsubscribeLikes,
} from '../../../redux/actions/posts/fetch';
import {
  clearCurrentPost
} from '../../../redux/actions/posts/edit';

import { fetchAllUsers } from '../../../redux/actions/users/fetch';

import { hasPostById } from '../../../redux/reducers/posts';
import Post from './Post';

class PostHOC extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }
  
  // loading post, comments and new comment
  componentDidMount() {
    const {
      fetchPost,
      fetchAllUsers,
      subscribeLikes,
      subscribeCommentCounter,
      users,
      hasPost,
    } = this.props;
    
    fetchPost({
      id: this.id,
      isPostsLoaded: hasPost
    });
    if (users.length === 0) {
      fetchAllUsers();
    }
    subscribeLikes();
    subscribeCommentCounter();
  }
  
  componentWillUnmount() {
    const {
      clearCurrentPost,
      unsubscribeLikes,
      unsubscribeCommentCounter,
    } = this.props;
    clearCurrentPost();
    unsubscribeLikes();
    unsubscribeCommentCounter();
  }
  
  render() {
    const {
      isPostPreview,
      history
    } = this.props;
    return (
      <Post
        isPostPreview={isPostPreview}
        history={history}
        postId={this.id}
      />
    );
  }
}

PostHOC.propTypes = {
  history: PropTypes.object.isRequired,
  isPostPreview: PropTypes.bool,
  users: PropTypes.array
};

PostHOC.defaultProps = {
  users: [],
  isPostPreview: false
};

// connection with redux
const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.id;
  return {
    error: state.posts.error,
    hasPost: hasPostById(state.posts, postId),
    isPostPreview: state.posts.isPostPreview,
    users: state.users.users
  };
};


export default connect(mapStateToProps, {
  fetchPost,
  clearCurrentPost,
  fetchAllUsers,
  subscribeLikes,
  subscribeCommentCounter,
  unsubscribeLikes,
  unsubscribeCommentCounter
})(PostHOC);
