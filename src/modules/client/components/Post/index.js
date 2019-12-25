/*
  display of a specific post
*/
import React from "react";
import request from "../../../../services/api/axios/index";
import { PostPreview } from "../PostPreview";
import { createID } from "../../../../services/helpers";
import { UserHeader } from "../UserHeader";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loadedComments: false,
      id: this.props.match.params.id,
      postData: {},
      comments: [],
      params: {
        page: 0,
        perPage: 10
      },
      commentText: "",
      mentionedUser: ""
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

    // get commets of post
    request
      .getComment({
        data: {
          id: this.state.id,
          params: this.state.params
        }
      })
      .then(res => {
        this.setState({
          comments: res.data,
          loadedComments: true,
        });
      })
      .catch(err => {
        console.log("error receiving comments", err);
      });
  }

  // updating input fields in the state
  updateForm = comment => {
    const newState = this.state;
    newState[comment.target.id] = comment.target.value;
    this.setState({ ...newState });
  };

  // sending the created comment and saving to the DB
  submit = event => {
    event.preventDefault();
    const { id, commentText, mentionedUser } = this.state;
    this.setState({ loadedComments: false });
    request
      .createComment({
        data: {
          postId: id,
          comment: commentText,
          mentionedUser: mentionedUser
        }
      })
      .then(res => {
        this.setState({ comments: res, loadedComments: true, commentText: "" });
      });
  };

  render() {
    const {
      loaded,
      loadedComments,
      postData,
      comments,
      commentText
    } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            <div>
              {/* render post content with with information about the author */}
              <PostPreview post={postData} history={this.props.history} />
            </div>
            {/* render comments of post */}
            {loadedComments && (
              <ul>
                {comments.map(comment => (
                  <li key={createID()}>
                    {/* header with data about comment author */}
                    <UserHeader
                      name={comment.author.name}
                      avatar={comment.author.avatar}
                      date={comment.createdAt}
                      onClick={() =>
                        this.props.history.push(`/user/${comment.authorId}`)
                      }
                    />
                    {/* comment text */}
                    {comment.text}
                  </li>
                ))}
              </ul>
            )}
            {!loadedComments && <h1>Loading comments...</h1>}
            {/* form for creating the new comment */}
            <form onSubmit={this.submit}>
              <label htmlFor="commentText">
                <input
                  id="commentText"
                  value={commentText}
                  placeholder="Write a comment"
                  onChange={this.updateForm}
                />
              </label>
              <input type="submit" value="submit comment" />
            </form>
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
