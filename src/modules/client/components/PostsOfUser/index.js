import React from "react";
import { createID } from "../../../../services/helpers";
import PostPreview from "../PostPreview";
import { connect } from "react-redux";
import { fetchPostsOfUser } from "../../../redux/actions/posts/fetch";
import { clearPostsOfUser } from "../../../redux/actions/posts/edit";

class PostsOfUser extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      params: {
        page: 0,
        perPage: 3
      }
    };
  }

  // search for all user posts in the DB
  componentDidMount() {
    if (!this.props.loadingPostsOfUser) {
      this.props.fetchPostsOfUser({ id: this.id });
    }
  }

  // remove data of posts of user from the store
  componentWillUnmount() {
    this.props.clearPostsOfUser();
  }

  render() {
    const { loadingPostsOfUser, posts } = this.props;
    return (
      <div>
        {!loadingPostsOfUser && (
          <div>
            {posts.map(item => {
              return (
                <div key={createID()}>
                  <PostPreview post={item} history={this.props.history} />
                </div>
              );
            })}
          </div>
        )}
        {loadingPostsOfUser && <h1>Loading...</h1>}
      </div>
    );
  }
}

// connection with redux
const mapStateToProps = state => {
  return {
    error: state.posts.errorsPostsOfUser,
    posts: state.posts.postsOfUser,
    loadingPostsOfUser: state.posts.loadingPostsOfUser
  };
};

export default connect(mapStateToProps, { fetchPostsOfUser, clearPostsOfUser })(
  PostsOfUser
);
