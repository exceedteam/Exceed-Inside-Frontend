/*
  Display of a specific post with comments
*/
import React from "react";
import PostPreview from "../PostPreview";
import DisplayComments from "../DisplayComments";
import CreateComment from "../CreateComment";
import { connect } from "react-redux";
import { fetchPost } from "../../../redux/actions/posts/fetch";
import { clearCurrentPost } from "../../../redux/actions/posts/edit";
import { likePost, dislikePost } from "../../../redux/actions/posts/edit";
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
      currentPostPreview,
      fetchComments,
      fetchNewComment
    } = this.props;
    if(!currentPostPreview)
    fetchPost({
      id: this.id,
      // isPostsLoaded: !!posts.length
    });
    fetchComments({
      id: this.id
    });
    fetchNewComment();
  }

  componentWillUnmount() {
    this.props.clearCurrentPost();
  }

  render() {
    const { currentPostPreview, comments, loading } = this.props;
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
              loading={loading}
              history={this.props.history}
              onClick={() => {}}
            />
          </div>
        )}
        {!currentPostPreview && <h1>Loading...</h1>}
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
    loading: state.comments.loading,
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  fetchComments,
  fetchNewComment,
  clearCurrentPost,
  likePost,
  dislikePost
})(Post);
