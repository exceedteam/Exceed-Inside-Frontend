import React from "react";
import request from "../../../../services/api/axios/index";
import { createID, prettyDate } from "../../../../services/helpers";

export default class PostsOfUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      postsOfUser: [],
      params: {
        page: 0,
        perPage: 30
      }
    };
  }

  // search for all user posts in the DB
  componentDidMount() {
    request
      .getPostsOfUser({
        inputData: {
          id: this.state.id,
          params: this.state.params
        }
      })
      .then(res => {
        this.setState({postsOfUser: res.posts,
         loaded: res.loaded});
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });
  }

  // go to a specific post
  showFullPost(id) {
    this.props.history.push(`/post/${id}`);
  }

  // render a list of user posts
  renderPostsOfUser = () => {
    return this.state.postsOfUser.map(item => {
      return (
        <div key={createID()}>
          <div
            onClick={() => {
              this.showFullPost(item.id);
            }}
          >
            <div>
              <span>{prettyDate(item.createdAt)}</span>
            </div>
            <span>{item.title}</span>
            <div>
              <span> {item.text}</span>
            </div>
            <div>
              {item.images.map(img => (
                <img key={createID()} src={img.src} alt="some value" />
              ))}
            </div>
            <div>
              <span>Комментариев: </span>
              {item.commentsCounter}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.state.loaded && <div>{this.renderPostsOfUser()}</div>}
        {!this.state.loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
