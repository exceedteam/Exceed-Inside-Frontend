/*
  Component whith which the application Main page is rendered 
*/
import React from "react";
import { createID, prettyDate } from "../../../../services/helpers";
import request from "../../../../services/api/axios/index";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      posts: [],
      params: {
        page: 0,
        perPage: 30
      }
    };
  }

  // request to display all posts
  componentDidMount() {
    request
      .getPosts({
        params: this.state.params
      })
      .then(posts => {
        this.setState(posts);
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });
  }

  // transition to a specific post
  showFullPost(id) {
    this.props.history.push(`/post/${id}`);
  }

  // go to post author
  showUserProfile(id) {
    this.props.history.push(`/user/${id}`);
  }

  // render list of posts
  renderPosts = () => {
    return this.state.posts.map(item => {
      return (
        <div key={createID()}>
          <div
            onClick={() => {
              this.showUserProfile(item.authorId);
            }}
          >
            <img src={item.author.avatar} alt="" />
            <span>{item.author.name}</span>
          </div>
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
        {this.state.loaded && <div>{this.renderPosts()}</div>}
        {!this.state.loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
