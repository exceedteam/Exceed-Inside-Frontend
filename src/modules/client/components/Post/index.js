/*
  Display of a specific post with comments
*/
import React from "react";
import PostPreview from "../PostPreview";
import DisplayComments from "../DisplayComments";
import styles from "./Post.module.css";
import { MentionsInput, Mention } from "react-mentions";
import { connect } from "react-redux";
import { fetchPost } from "../../../redux/actions/posts/fetch";
import { createComment } from "../../../redux/actions/comments/create";
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
    this.state = {
      commentText: "",
      userList: []
    };
  }

  // loading post, comments and new comment
  componentDidMount() {
    const { fetchPost, posts, fetchComments, fetchNewComment } = this.props;
    fetchPost({
      id: this.id,
      isPostsLoaded: !!posts.length
    });
    fetchComments({
      id: this.id
    });
    fetchNewComment();
  }

  componentWillUnmount() {
    this.props.clearCurrentPost();
  }

  // sending the created comment and saving to the DB
  newComment = event => {
    event.preventDefault();
    const { commentText } = this.state;
    const { id } = this;
    this.props.createComment({ commentText, id });
  };

  render() {
    const { currentPostPreview, comments, loading } = this.props;
    const { commentText, userList } = this.state;
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
            {/* form for creating the new comment */}
            <form onSubmit={this.submit} className={styles.createComment}>
              <MentionsInput
                value={commentText}
                onChange={event =>
                  this.setState({ commentText: event.target.value })
                }
              >
                <Mention
                  trigger="@"
                  data={userList}
                  displayTransform={(id, display) => {
                    return "@" + display;
                  }}
                />
              </MentionsInput>
              <button onClick={this.newComment} className={styles.button}>
                submit comment
              </button>
            </form>
            {/* render comments of post */}
            <DisplayComments
              comments={comments}
              loading={loading}
              history={this.props.history}
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
    loading: state.comments.loading
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  fetchComments,
  createComment,
  fetchNewComment,
  clearCurrentPost,
  likePost,
  dislikePost
})(Post);
