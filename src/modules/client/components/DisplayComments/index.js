// display post comments
import React from "react";
import styles from "./DisplayComments.module.css";
import { createID } from "../../../../services/helpers";
import { PostHeader } from "../PostHeader";
import { MentionsInput, Mention } from "react-mentions";
import CreateComment from "../CreateComment";

export default class DisplayComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleInput: false
    };
  }

  handleVisible = () => {
    this.setState({ isVisibleInput: !this.state.isVisibleInput });
  };

  render() {
    const { loading, comments } = this.props;
    const { isVisibleInput } = this.state;
    return (
      <div>
        {!loading && (
          <ul className={styles.displayComment}>
            {comments.map(comment => (
              <li key={createID()}>
                {/* header with data about comment author */}
                <PostHeader
                  name={comment.author.name}
                  avatar={comment.author.avatar}
                  date={comment.createdAt}
                  onClick={() => {
                    this.props.history.push(`/user/${comment.authorId}`);
                  }}
                />
                {/* comment text with metioned users*/}
                <MentionsInput
                  disabled
                  value={comment.text}
                  className={styles.textarea}
                  onClick={() => this.handleVisible}
                >
                  <Mention
                    trigger="@"
                    displayTransform={(id, display) => {
                      return "@" + display;
                    }}
                  />
                </MentionsInput>
                {isVisibleInput && <CreateComment id={comment.id}/>}
              </li>
            ))}
          </ul>
        )}
        {loading && <h1>Loading comments...</h1>}
      </div>
    );
  }
}
