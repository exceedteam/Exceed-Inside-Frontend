// display post comments
import React from "react";
import {
  createID,
  typeOfTime,
  togglePropertyInSet,
  isAuthor,
} from "../../../../services/helpers";
import CreateComment from "../CreateComment";
import EditComment from "../EditComment";
import Loader from "../Loader";
import { connect } from "react-redux";
import { fetchComments } from "../../../redux/actions/comments/fetch";
import { Comment, Popup, Button, Image } from "semantic-ui-react";

class DisplayComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleInput: false,
      idsOfCommentsIsShown: new Set([]),
      currentCommentId: "",
      editCommentId: "",
      params: {
        page: 1,
        perPage: 10,
      },
    };
  }

  // window display function for responding to a comment
  handleVisible = (id) => {
    this.setState({
      isVisibleInput: !this.state.isVisibleInput,
      currentCommentId: id,
    });
  };

  // upload answered comments to a specific comment
  uploadAnsveredComments = ({ postId, commentId }) => {
    const filteredComments = this.props.comments.filter(
      (comment) => commentId === comment.parent
    );
    if (!filteredComments.length) {
      this.props.fetchComments({ id: postId, commentId: commentId });
    }
    let { idsOfCommentsIsShown } = this.state;

    idsOfCommentsIsShown = togglePropertyInSet(idsOfCommentsIsShown, commentId);

    this.setState({
      idsOfCommentsIsShown,
      currentCommentId: commentId,
    });
  };

  // display message with mentioned users
  replaceId = (text) => {
    const re = /@\[(.+?)\]\(\w+?\)/g;
    const { users } = this.props;
    return (
      <div className="subcomment">
        {text.split(re).map((partOfText) => {
          const currentUserDisplayInPopUp = users.find(
            (user) => user.display === partOfText
          );
          if (currentUserDisplayInPopUp) {
            return (
              <Popup
                key={createID()}
                header={currentUserDisplayInPopUp.display}
                content={`${currentUserDisplayInPopUp.team} : ${currentUserDisplayInPopUp.position}`}
                trigger={<div className="mentionUser">@{partOfText} </div>}
                className="miniPopup"
                basic
              />
            );
          } else {
            return <div key={createID()}>{partOfText + " "}</div>;
          }
        })}
      </div>
    );
  };

  // display answered comments
  renderSubcomments = (currentCommentId) => {
    const { comments, loading } = this.props;
    const { currentCommentId: onClickComment } = this.state;
    const subComments = comments.filter(
      (comment) => comment.parent === currentCommentId
    );
    return (
      <React.Fragment>
        <Comment.Group>
          {subComments.map((comment) => {
            return (
              <Comment key={createID()}>
                <Comment.Avatar
                  as={Image}
                  src={comment.author.avatar}
                  size="tiny"
                  circular
                />
                <Comment.Content>
                  <Comment.Author
                    as="a"
                    onClick={() => {
                      this.props.history.push(`/user/${comment.authorId}`);
                    }}
                  >
                    {comment.author.name}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{typeOfTime(comment.createdAt)}</div>
                  </Comment.Metadata>

                  <Comment.Text>{this.replaceId(comment.text)}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}
        </Comment.Group>
        {loading && onClickComment === currentCommentId && <Loader />}
      </React.Fragment>
    );
  };

  //pagination
  changePage = () => {
    const { params } = this.state;
    this.setState({
      params: {
        ...params,
        page: params.page + 1,
      },
    });
    this.recieveComments();
  };

  //edit comment
  editComment = (id) => {
    const { editCommentId } = this.state;
    if (editCommentId) {
      this.setState({ editCommentId: "" });
    } else {
      this.setState({ editCommentId: id });
    }
  };

  recieveComments = () => {
    const { fetchComments } = this.props;
    fetchComments({ ...this.state.params, id: this.props.comments[0].postId });
  };

  render() {
    const { comments } = this.props;
    const {
      isVisibleInput,
      currentCommentId,
      idsOfCommentsIsShown,
      editCommentId,
    } = this.state;
    return (
      <div className="commentsField">
        <Comment.Group threaded>
          {comments
            .filter((comment) => comment.parent === "")
            .map((comment) => (
              <React.Fragment key={createID()}>
                <Comment>
                  <Comment.Avatar
                    as={Image}
                    src={comment.author.avatar}
                    size="tiny"
                    circular
                  />
                  <Comment.Content>
                    <Comment.Author
                      as="a"
                      onClick={() => {
                        this.props.history.push(`/user/${comment.authorId}`);
                      }}
                    >
                      {comment.author.name}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{typeOfTime(comment.createdAt)}</div>
                    </Comment.Metadata>

										{/* display specific comment */}
                    {editCommentId === comment.id ? (
                      <EditComment
                        closeComment={this.editComment}
												postId={comment.postId}
												commentId={comment.id}
												text={comment.text}
                        type={"Edit"}
                      />
                    ) : (
                      <Comment.Text>
                        {this.replaceId(comment.text)}
                      </Comment.Text>
                    )}

                    <Comment.Actions>
                      {/* button to reply to a comment */}
                      <Comment.Action
                        onClick={() => this.handleVisible(comment.id)}
                      >
                        Reply
                      </Comment.Action>

                      {/* show/hide comments replies */}
                      {comment.answeredUser.length > 0 && (
                        <Comment.Action
                          onClick={() => {
                            this.uploadAnsveredComments({
                              postId: comment.postId,
                              commentId: comment.id,
                            });
                          }}
                        >
                          {`${
                            idsOfCommentsIsShown.has(comment.id)
                              ? "Hide"
                              : "Show"
                          } replied messages`}
                        </Comment.Action>
                      )}

                      {/* comment editing (if user is author) */}
                      {isAuthor(comment.authorId) && (
                        <Comment.Action
                          onClick={() => this.editComment(comment.id)}
                        >
                          {`${
                            comment.id === editCommentId ? "cancel" : "edit"
                          }`}
                        </Comment.Action>
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {idsOfCommentsIsShown.has(comment.id) &&
                    this.renderSubcomments(comment.id)}
                </Comment>

                {/* form for creating answer to comment if the response button is clicked */}
                {isVisibleInput && currentCommentId === comment.id && (
                  <CreateComment
                    id={comment.postId}
                    withoutParent={false}
                    parent={comment.id}
                    replyCallback={() => {
                      idsOfCommentsIsShown.add(currentCommentId);
                    }}
                    type={"Reply"}
                    mention={{
                      id: comment.authorId,
                      name: comment.author.name,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
        </Comment.Group>

        {/* button to upload comments */}
        <Button className="receive" onClick={() => this.changePage()} primary>
          Receive Comments
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.comments.loading,
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { fetchComments })(DisplayComments);
