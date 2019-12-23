/*
  display of a specific post
*/
import React from "react";
import request from "../../../../services/api/axios/index";
import { PostPreview } from "../PostPreview";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      postData: {}
    };
  }

  // search for a specific post in the DB
  componentDidMount() {
    request
      .getPost({
        id: this.state.id
      })
      .then(res => {
        this.setState({
          postData: res.data,
          loaded: res.loaded
        });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  render() {
    const { loaded, postData } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            <PostPreview post={postData} history={this.props.history} />
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
