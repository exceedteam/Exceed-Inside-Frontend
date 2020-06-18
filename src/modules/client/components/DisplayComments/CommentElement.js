// display post comments
import React, { useCallback } from 'react';
import { Comment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isAuthor, typeOfTime } from '../../../../services/helpers';
import EditComment from '../EditComment';
import InsertUserInfo from './InsertUserInfo';
import { getCommentById } from '../../../redux/reducers/comments';

const CommentElement = ({
                          commentId,
                          onEditComment,
                          onShowSubComments,
                          handleVisible,
                          isEdit,
                          isHasSubComments,
                          isShowSubComments,
                          subComments
                        }) => {
  const comment = useSelector(state => getCommentById(state.comments, commentId));
  const history = useHistory();
  
  const handleEditComment = useCallback(() => {
    onEditComment(commentId);
  }, [ onEditComment, commentId ]);
  
  const handleVisibleReplyInput = useCallback(() => {
    handleVisible(commentId);
  }, [ handleVisible, commentId ]);
  
  const handleShowSubComments = useCallback(() => {
    onShowSubComments({
      postId: comment.postId,
      commentId: comment.id
    });
  }, [ onShowSubComments, comment ]);
  
  if ( !comment.id) return null;
  
  return (
    <Comment className='comment__body'>
      <Comment.Avatar
        as={Image}
        src={comment.author.avatar}
        size='tiny'
        circular
      />
      <Comment.Content
        className='comment__body-content'
      >
        <Comment.Author
          as='a'
          onClick={() => {
            history.push(`/user/${comment.authorId}`);
          }}
        >
          {comment.author.name}
        </Comment.Author>
        <Comment.Metadata>
          <div>{typeOfTime(comment.createdAt)}</div>
        </Comment.Metadata>
        
        {/* display specific comment */}
        {isEdit ? (
          <EditComment
            closeComment={handleEditComment}
            postId={comment.postId}
            commentId={comment.id}
            text={comment.text}
            type='Edit'
          />
        ) : (
          <Comment.Text>
            <InsertUserInfo text={comment.text} />
          </Comment.Text>
        )}
        <Comment.Actions>
          
          {/* button to reply to a comment */}
          {
            !comment.parent && (
              <Comment.Action
                onClick={handleVisibleReplyInput}
              >
                Reply
              </Comment.Action>
            )
          }
          
          {comment.answeredUser.length > 0 && (
            <Comment.Action
              onClick={handleShowSubComments}
            >
              {`${
                isShowSubComments
                  ? 'Hide'
                  : 'Show'
              } replied messages`}
            </Comment.Action>
          )}
          {/* comment editing (if user is author) */}
          {isAuthor(comment.authorId) && (
            <Comment.Action
              onClick={handleEditComment}
            >
              {`${
                isEdit ? 'Cancel' : 'Edit'
              }`}
            </Comment.Action>
          )}
        </Comment.Actions>
      </Comment.Content>
      {
        isHasSubComments && subComments
      }
    </Comment>
  );
};

CommentElement.propTypes = {
  commentId: PropTypes.string.isRequired,
  onEditComment: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isHasSubComments: PropTypes.bool,
  isShowSubComments: PropTypes.bool,
  subComments: PropTypes.any,
  handleVisible: PropTypes.func,
  onShowSubComments: PropTypes.func
};

CommentElement.defaultProps = {
  isHasSubComments: false,
  isShowSubComments: false,
  subComments: null,
  handleVisible: () => {
  },
  onShowSubComments: () => {
  }
};

export default CommentElement;
