// display post comments
import React from 'react';
import { connect } from 'react-redux';
import { Comment, Button } from 'semantic-ui-react';
import {
  createID,
  togglePropertyInSet
} from '../../../../services/helpers';
import CreateComment from '../CreateComment';
import Loader from '../Loader';
import CommentElement from './CommentElement';
import {
  fetchComments,
  subscribeComments,
  unsubscribeComments
} from '../../../redux/actions/comments/fetch';
import {
  getSubCommentsByCommentIdFromState,
  getCommentById
} from '../../../redux/reducers/comments';

class DisplayComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleInput: false,
      idsOfCommentsIsShown: new Set([]),
      currentCommentId: '',
      editCommentId: '',
      params: {
        page: 0,
        perPage: 15
      }
    };
  }
  
  componentDidMount = () => {
    const { subscribeComments } = this.props;
    this.receiveComments();
    subscribeComments();
  };
  
  // window display function for responding to a comment
  handleVisible = (id) => {
    this.setState((state) => ( {
      isVisibleInput: !state.isVisibleInput,
      currentCommentId: id
    } ));
  };
  
  // upload answered comments to a specific comment
  uploadAnsweredComments = ({ postId, commentId }) => {
    const { answeredUser } = this.props.getComment(commentId);
    const subComments = this.props.getSubComments(commentId);
    const isNeedFetchSubComments = answeredUser?.length !== subComments?.length;
    if (isNeedFetchSubComments) this.props.fetchComments({ id: postId, commentId });
    
    let { idsOfCommentsIsShown } = this.state;
    idsOfCommentsIsShown = togglePropertyInSet(idsOfCommentsIsShown, commentId);
    this.setState({
      idsOfCommentsIsShown,
      currentCommentId: commentId
    });
  };
  
  // display answered comments
  renderSubComments = (currentCommentId) => {
    const { loading } = this.props;
    const { currentCommentId: onClickComment, editCommentId } = this.state;
    const subComments = this.props.getSubComments(currentCommentId);
    
    return (
      <>
        <Comment.Group>
          {subComments.map((commentId) => {
            return (
              <CommentElement
                key={createID()}
                isEdit={editCommentId === commentId}
                commentId={commentId}
                onEditComment={this.editComment}
              />
            );
          })}
        </Comment.Group>
        {loading && onClickComment === currentCommentId && <Loader />}
      </>
    );
  };
  
  // pagination
  changePage = () => {
    this.setState((state) => ( {
      params: {
        ...state.params,
        page: state.params.page + 1
      }
    } ), this.receiveComments);
  };
  
  // edit comment
  editComment = (id) => {
    this.setState(({ editCommentId }) => ( { editCommentId: editCommentId ? '' : id } ));
  };
  
  receiveComments = () => {
    const { fetchComments, postId } = this.props;
    fetchComments({ ...this.state.params, id: postId });
  };
  
  
  componentWillUnmount = () => {
    const { unsubscribeComments } = this.props;
    unsubscribeComments();
  };
  
  render() {
    const { comments, postId } = this.props;
    const {
      isVisibleInput,
      currentCommentId,
      idsOfCommentsIsShown,
      editCommentId
    } = this.state;
    return (
      <div className='commentsField'>
        <Comment.Group threaded>
          {comments
            .map((commentId) => (
              <React.Fragment key={createID()}>
                <CommentElement
                  isEdit={editCommentId === commentId}
                  commentId={commentId}
                  onEditComment={this.editComment}
                  isHasSubComments={idsOfCommentsIsShown.has(commentId)}
                  subComments={this.renderSubComments(commentId)}
                  handleVisible={this.handleVisible}
                  onShowSubComments={this.uploadAnsweredComments}
                />
                {isVisibleInput && currentCommentId === commentId && (
                  <CreateComment
                    id={postId}
                    withoutParent={false}
                    parent={commentId}
                    replyCallback={() => {
                      idsOfCommentsIsShown.add(currentCommentId);
                    }}
                    type='Reply'
                  />
                )}
              </React.Fragment>
            ))}
        </Comment.Group>
        
        {/* button to upload comments */}
        <Button className='receive' onClick={() => this.changePage()} primary>
          Receive Comments
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const getSubComments = (id) => getSubCommentsByCommentIdFromState(state.comments, id);
  const getComment = (id) => getCommentById(state.comments, id);
  
  return {
    getSubComments,
    getComment,
    errors: state.comments.errors,
    comments: state.comments.displayComments,
    loading: state.comments.loading
  };
};

export default connect(mapStateToProps, {
  fetchComments,
  subscribeComments,
  unsubscribeComments
})(DisplayComments);
