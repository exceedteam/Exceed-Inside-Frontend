/*
  Component whith which the application Main page is rendered 
*/
import React from "react";
import { createID } from "../../../../services/helpers";
import request from "../../../../services/api/axios/index";
import { PostPreview } from "../PostPreview";

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

  render() {
    const { loaded, data } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            {data.map(item => {
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
