/*
  Component whith which the application Main page is rendered 
*/
import React from "react";
import { createID } from "../../../../services/helpers";
import PostPreview from "../PostPreview";
import styles from "./Main.module.css";
import { connect } from "react-redux";
import { fetchPosts } from "../../../redux/actions/posts/fetch";
import { likePost, dislikePost } from "../../../redux/actions/posts/edit";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      params: {
        page: 0,
        perPage: 3
      }
    };
  }

  // request to display all posts
  componentDidMount() {
    const { params } = this.state;
    if (!this.props.postsLoaded) {
      this.receivePosts(params);
    }
    this.setState({
      params: {
        ...params,
        page: params.page + 1
      }
    });
  }

  receivePosts = () => {
    const { fetchPosts } = this.props;
    fetchPosts(this.state.params);
  };

  // loading of previous posts
  changePage = () => {
    const { params } = this.state;
    this.setState({
      params: {
        ...params,
        page: params.page + 1
      }
    });
    this.receivePosts(this.state.params);
  };

  render() {
    const { posts, loading } = this.props;
    return (
      <div className={styles.pageWrapper}>
        {!!posts.length && (
          <div className={styles.content}>
            {posts.map(item => {
              return (
                <div key={createID()} className={styles.post}>
                  <PostPreview
                    post={item}
                    history={this.props.history}
                    likePost={this.props.likePost}
                    dislikePost={this.props.dislikePost}
                  />
                </div>
              );
            })}
            {!loading && (
              <button className={styles.button} onClick={this.changePage}>
                Receive Posts
              </button>
            )}
          </div>
        )}
        {loading && <h1 className={styles.loading}>Loading...</h1>}
      </div>
    );
  }
}

//connection with redux
const mapStateToProps = state => {
  return {
    errors: state.posts.errors,
    loading: state.posts.loading,
    posts: state.posts.posts,
    postsLoaded: state.posts.postsLoaded
  };
};

export default connect(mapStateToProps, { fetchPosts, likePost, dislikePost })(
  Posts
);
