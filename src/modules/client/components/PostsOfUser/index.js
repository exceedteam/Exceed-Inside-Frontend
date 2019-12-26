import React from "react";
import request from "../../../../services/api/axios/index";
import { createID } from "../../../../services/helpers";
import { PostPreview } from "../PostPreview";

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

  render() {
    const { loaded, postsOfUser } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            {postsOfUser.map(item => {
              return (
                <div key={createID()}>
                  <PostPreview post={item} history={this.props.history} />
                </div>
              );
            })}
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
