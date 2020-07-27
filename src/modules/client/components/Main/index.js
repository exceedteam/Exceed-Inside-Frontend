/*
  Component whith which the application Main page is rendered
*/
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { createID } from '../../../../services/helpers';
import PostPreview from '../PostPreview';
import {
  fetchPosts,
  subscribeNewPost,
  subscribeLikes,
  subscribeCommentCounter,
  unsubscribeNewPost,
  unsubscribeLikes,
  unsubscribeCommentCounter
} from '../../../redux/actions/posts/fetch';
import { likePost, dislikePost } from '../../../redux/actions/posts/edit';
import Loader from '../../../common/Loader';
import './main.scss';
import 'react-calendar/dist/Calendar.css';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 0,
        perPage: 5
      }
    };
  }
  
  // request to display all posts
  componentDidMount() {
    const { params } = this.state;
    const {
      postsLoaded,
      subscribeNewPost,
      subscribeLikes,
      subscribeCommentCounter
    } = this.props;
    if ( !postsLoaded) {
      this.receivePosts(params);
    }
    
    subscribeNewPost();
    subscribeLikes();
    subscribeCommentCounter();
    
    this.setState({
      params: {
        ...params,
        page: params.page + 1
      }
    });
  }
  
  receivePosts = () => {
    const { fetchPosts } = this.props;
    fetchPosts(this.state.params);
  };
  
  // loading of previous posts
  changePage = () => {
    const { params } = this.state;
    this.setState({
      params: {
        ...params,
        page: params.page + 1
      }
    });
    this.receivePosts(this.state.params);
  };
  
  componentWillUnmount() {
    const {
      unsubscribeNewPost,
      unsubscribeLikes,
      unsubscribeCommentCounter
    } = this.props;
    
    unsubscribeNewPost();
    unsubscribeLikes();
    unsubscribeCommentCounter();
  }
  
  render() {
    const { posts, loading } = this.props;
    const { date } = this.state;
    return (
      <div className='pageWrapper'>
        <div className='postsContent'>
          { !!posts.length && (
            <>
              {posts.map((item) => {
                return (
                  <PostPreview
                    key={createID()}
                    postId={item}
                    isMainPost
                  />
                );
              })}
              { !loading && (
                <Button className='receive' onClick={this.changePage} primary>
                  Receive Posts
                </Button>
              )}
            </>
          )}
          {loading && <Loader />}
        </div>
        <div className='rightColumn'>
          <Calendar value={date} />
        </div>
      </div>
    );
  }
}

// connection with redux
const mapStateToProps = (state) => {
  return {
    errors: state.posts.errors,
    loading: state.posts.loading,
    posts: state.posts.displayPosts,
    postsLoaded: state.posts.postsLoaded
  };
};


export default connect(mapStateToProps, {
  fetchPosts,
  likePost,
  dislikePost,
  subscribeNewPost,
  subscribeLikes,
  subscribeCommentCounter,
  unsubscribeNewPost,
  unsubscribeLikes,
  unsubscribeCommentCounter
})(
  Posts
);
