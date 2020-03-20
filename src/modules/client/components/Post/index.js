/*
  Display of a specific post with comments
*/
import React from "react";
import PostPreview from "../PostPreview";
import DisplayComments from "../DisplayComments";
import CreateComment from "../CreateComment";
import Loader from "../Loader";
import { connect } from "react-redux";
import { fetchPost } from "../../../redux/actions/posts/fetch";
import { clearCurrentPost } from "../../../redux/actions/posts/edit";
import { clearCurrentComments } from "../../../redux/actions/comments/edit";
import { likePost, dislikePost } from "../../../redux/actions/posts/edit";
import { fetchAllUsers } from "../../../redux/actions/users/fetch";
import {
  fetchComments,
  fetchNewComment
} from "../../../redux/actions/comments/fetch";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }

  // loading post, comments and new comment
  componentDidMount() {
    const {
      fetchPost,
      fetchComments,
      fetchNewComment,
      fetchAllUsers
    } = this.props;
    fetchPost({
      id: this.id,
      
    });
    fetchComments({
      id: this.id
    });
    fetchNewComment();
    if (this.props.users.length === 0) {
      fetchAllUsers();
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentPost();
    this.props.clearCurrentComments();
  }

  render() {
    const { currentPostPreview, comments } = this.props;
    return (
      <div>
        {!!currentPostPreview && (
          <div>
            <div>
              {/* render post content with with information about the author */}
              <PostPreview
                post={this.props.currentPostPreview}
                history={this.props.history}
                likePost={this.props.likePost}
                dislikePost={this.props.dislikePost}
              />
            </div>
            <CreateComment id={this.id} />
            {/* render comments of post */}
            <DisplayComments
              comments={comments}
              history={this.props.history}
              onClick={() => {}}
            />
          </div>
        )}
        {!currentPostPreview && <Loader />}
      </div>
    );
  }
}

//connection with redux
const mapStateToProps = state => {
  return {
    error: state.posts.error,
    posts: state.posts.posts,
    currentPostPreview: state.posts.currentPostPreview,
    errors: state.comments.errors,
    comments: state.comments.comments,
    users: state.users.users
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  fetchComments,
  fetchNewComment,
  clearCurrentComments,
  clearCurrentPost,
  likePost,
  dislikePost,
  fetchAllUsers
})(Post);
