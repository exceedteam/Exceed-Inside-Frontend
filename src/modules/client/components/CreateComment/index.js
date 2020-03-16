import React from "react";
import { connect } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import { createComment } from "../../../redux/actions/comments/create";

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    };
  }

  componentDidMount() {
    const { mention } = this.props;
    if (mention) {
      this.setState({
        commentText: `@[${mention.name}](${mention.id})`
      })
    }
  }

  newComment = event => {
    event.preventDefault();
    const { commentText } = this.state;
    const { id, createComment, parent, withoutParent } = this.props;
    if (!withoutParent) {
      createComment({ commentText, id, parent, withoutParent});
    } else {
      createComment({ commentText, id });
    }
    this.setState({ commentText: "" });
  };

  render() {
    const { commentText } = this.state;
    const { users } = this.props;
    return (
      <form onSubmit={this.submit} className="createComment">
        <MentionsInput
          className="new"
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
        <button onClick={this.newComment} className="button">
          submit
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

export default connect(mapStateToProps, { createComment })(
  CreateComment
);
