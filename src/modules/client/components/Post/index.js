/*
  display of a specific post
*/
import React from "react";
import request from "../../../../services/api/axios/index";
import { PostPreview } from "../PostPreview";
import DisplayComments from "../DisplayComments/index";
import { MentionsInput, Mention } from "react-mentions";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loadedComments: false,
      id: this.props.match.params.id,
      postData: {},
      comments: [],
      commentText: "",
      mentionedUser: "",
      userList: []
    };
  }

  componentDidMount() {
    // search for a specific post in the DB
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
          id: this.state.id
        }
      })
      .then(res => {
        this.setState({
          comments: res.data,
          loadedComments: true
        });
      })
      .catch(err => {
        console.log("error receiving comments", err);
      });

    // get name and id of all users
    request
      .getAllNameOfUsers({
        params: {
          page: 0,
          perPage: 100
        }
      })
      .then(data => {
        this.setState({ userList: data });
      })
      .catch(e => {
        console.log("error", e);
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
    this.setState({ loadedComments: false, commentText: "" });
    request
      .createComment({
        data: {
          postId: id,
          comment: commentText,
          mentionedUser: mentionedUser
        }
      })
      .then(res => {
        this.setState({ comments: res, loadedComments: true});
      });
  };

  render() {
    const {
      loaded,
      postData,
      commentText,
      comments,
      id,
      userList,
      loadedComments
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
            <DisplayComments
              id={id}
              comments={comments}
              loadedComments={loadedComments}
            />
            {/* form for creating the new comment */}
            <form onSubmit={this.submit}>
              <MentionsInput
                value={commentText}
                onChange={event =>
                  this.setState({ commentText: event.target.value })
                }
              >
                <Mention
                  trigger="@"
                  data={userList}
                  displayTransform={(id, display) => {
                    console.log(display);
                    return "@" + display;
                  }}
                />
              </MentionsInput>
              <input type="submit" value="submit comment" />
            </form>
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
