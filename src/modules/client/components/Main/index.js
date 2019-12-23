/*
  Component whith which the application Main page is rendered 
*/
import React from "react";
import { createID, prettyDate } from "../../../../services/helpers";
import request from "../../../../services/api/axios/index";
import { UserHeader } from "../UserHeader";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: [],
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
      .then(data => {
        this.setState(data);
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });
  }

  // render list of posts
  renderPosts = () => {
    const { data } = this.state;
    return data.map(item => {
      return (
        <div key={createID()}>
          <div>
            <UserHeader
              name={item.author.name}
              avatar={item.author.avatar}
              onClick={() => this.props.history.push(`/user/${item.authorId}`)}
            />
          </div>
          <div onClick={() => this.props.history.push(`/post/${item.id}`)}>
            <div>
              <span>{prettyDate(item.createdAt)}</span>
            </div>
            <span>{item.title}</span>
            <div>
              <span> {item.text}</span>
            </div>
            <div>
              {item.images.map(img => (
                <img key={createID()} src={img.src} alt="" />
              ))}
            </div>
            <div>
              <span>Comments: </span>
              {item.commentsCounter}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { loaded } = this.state;
    return (
      <div>
        {loaded && <div>{this.renderPosts()}</div>}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
