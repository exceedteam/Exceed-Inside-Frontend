import React from "react";
import { connect } from "react-redux";
import styles from "./CreateComment.module.css";
import { MentionsInput, Mention } from "react-mentions";
import { createComment } from "../../../redux/actions/comments/create";
import { fetchAllUsers } from "../../../redux/actions/users/fetch";

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    };
  }

  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
  }

  newComment = event => {
    event.preventDefault();
    const { commentText } = this.state;
    const { id, createComment } = this.props;
    createComment({ commentText, id });
    this.setState({ commentText: "" });
  };

  render() {
    const { commentText } = this.state;
    const { users } = this.props;
    return (
      <form onSubmit={this.submit} className={styles.createComment}>
        <MentionsInput
          className={styles.new}
          value={commentText}
          onChange={event => this.setState({ commentText: event.target.value })}
        >
          <Mention
            trigger="@"
            data={users}
            displayTransform={(id, display) => {
              return "@" + display;
            }}
          />
        </MentionsInput>
        <button onClick={this.newComment} className={styles.button}>
          submit comment
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, { createComment, fetchAllUsers })(
  CreateComment
);
