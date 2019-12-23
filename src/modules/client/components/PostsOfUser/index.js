import React from "react";
import request from "../../../../services/api/axios/index";
import { createID, prettyDate } from "../../../../services/helpers";
import { UserHeader } from "../UserHeader";

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
        this.setState({ postsOfUser: res.data, loaded: res.loaded });
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("err", error);
      });
  }

  // render a list of user posts
  renderPostsOfUser = () => {
    const { postsOfUser, id } = this.state;
    return postsOfUser.map(item => {
      return (
        <div key={createID()}>
           <div>
            <UserHeader
              name={item.author.name}
              avatar={item.author.avatar}
              onClick={() => this.props.history.push(`/user/${id}`)}
            />
          </div>
          <div
            onClick={() => {
              this.props.history.push(`/post/${item.id}`);
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
                <img key={createID()} src={img.src} alt="" />
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
    const { loaded } = this.state;
    return (
      <div>
        {loaded && <div>{this.renderPostsOfUser()}</div>}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
