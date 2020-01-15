/*
  Display of a specific post with comments
*/
import React from "react";
import PostPreview from "../PostPreview";
import DisplayComments from "../DisplayComments";
import { connect } from "react-redux";
import { fetchPost } from "../../../redux/actions/posts/fetch";
import { fetchComments } from "../../../redux/actions/comments/fetch";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }

  componentDidMount() {
    const { fetchPost, posts, fetchComments } = this.props;
    fetchPost({
      id: this.id,
      isPostsLoaded: !!posts.length
    });
    fetchComments({
      id: this.id
    });
  }

  render() {
    const { currentPostPreview, comments, loading } = this.props;
    return (
      <div>
        {currentPostPreview && (
          <div>
            <div>
              <PostPreview
                post={currentPostPreview}
                history={this.props.history}
              />
            </div>
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

export default connect(mapStateToProps, { fetchPost, fetchComments })(Post);
