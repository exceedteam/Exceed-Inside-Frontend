// display post comments
import React from "react";
import styles from "./DisplayComments.module.css";
import { createID } from "../../../../services/helpers";
import { PostHeader } from "../PostHeader";
import { MentionsInput, Mention } from "react-mentions";

export default class DisplayComments extends React.Component {
  render() {
    const { loading, comments } = this.props;
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
                <MentionsInput disabled value={comment.text} className={styles.textarea}>
                  <Mention
                    trigger="@"
                    displayTransform={(id, display) => {
                      return "@" + display;
                    }}
                  />
                </MentionsInput>
              </li>
            ))}
          </ul>
        )}
        {loading && <h1>Loading comments...</h1>}
      </div>
    );
  }
}
