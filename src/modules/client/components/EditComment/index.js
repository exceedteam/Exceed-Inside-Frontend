import React from 'react';
import { connect } from 'react-redux';
import { MentionsInput, Mention } from 'react-mentions';
import { Button, Icon } from 'semantic-ui-react';
import { editComment } from '../../../redux/actions/comments/edit';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: this.props.text
    };
  }
  
  // sending information about updated comment and closing input with edit comment
  editCommentHandler = () => {
    const { commentText } = this.state;
    const { postId, commentId } = this.props;
    this.props.editComment({ postId, commentId, text: commentText });
    this.props.closeComment();
  };
  
  render() {
    const { commentText } = this.state;
    const { users, type } = this.props;
    return (
      <div className={`createTheNewComment ${type}`}>
        <MentionsInput
          className='new'
          value={commentText}
          onChange={(event) =>
            this.setState({ commentText: event.target.value })}
        >
          <Mention
            className='mention'
            trigger='@'
            data={users}
            displayTransform={(id, display) => {
              return `@${display} `;
            }}
          />
        </MentionsInput>
        <Button className='sendBtn' onClick={this.editCommentHandler}>
          <Icon name='send' />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, { editComment })(EditComment);
