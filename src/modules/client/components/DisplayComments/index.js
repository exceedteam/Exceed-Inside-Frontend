// display post comments
import React from "react";
import { createID } from "../../../../services/helpers";
import { UserHeader } from "../UserHeader";
import { MentionsInput, Mention } from "react-mentions";

export default class DisplayComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      params: {
        page: 0,
        perPage: 10
      },
      commentText: "",
      mentionedUser: ""
    };
  }

  render() {
    const { loadedComments, comments } = this.props;
    return (
      <div>
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
                {/* comment text with metioned users*/}
                <MentionsInput disabled value={comment.text}>
                  <Mention
                    trigger="@"
                    displayTransform={(id, display) => {
                      console.log(display);
                      return "@" + display;
                    }}
                  />
                </MentionsInput>
              </li>
            ))}
          </ul>
        )}
        {!loadedComments && <h1>Loading comments...</h1>}
      </div>
    );
  }
}
