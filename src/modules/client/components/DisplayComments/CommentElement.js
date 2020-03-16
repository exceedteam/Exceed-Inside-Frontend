// display post comments
import React, {Fragment} from "react";
import styles from "./DisplayComments.module.css";
import { createID } from "../../../../services/helpers";
import { PostHeader } from "../PostHeader";
import { MentionsInput, Mention } from "react-mentions";
import Loader from "../Loader"

export default class CommentElement extends React.Component {
  render () {
    const {comment} = this.props;
    return <Fragment>
       <PostHeader
          name={comment.author.name}
          avatar={comment.author.avatar}
          date={comment.createdAt}
          onClick={() => {
            this.props.history.push(`/user/${comment.authorId}`);
          }}
        />
        <div
          className={"comment"}
        >
          {/* comment text with metioned users*/}
          <MentionsInput
            disabled
            value={comment.text}
            className={styles.textarea}
          >
            <Mention
              trigger="@"
              displayTransform={(id, display) => {
                return "@" + display;
              }}
            />
          </MentionsInput>
        </div>
    </Fragment>
  }
}