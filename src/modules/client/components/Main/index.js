import React from "react";
import axios from "axios";
import { createID } from "../../../../services";

const allPostsURL = "http://localhost:5000/api/posts";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get(allPostsURL, {
        headers: { authorization: token },
        params: {
          page: 0,
          perPage: 30
        }
      })
      .then(response => {
        return response.data.map(async post => {
          const autor = await findById(post.authorId);
          return {
            ...post,
            autor
          };
        });
      })
      .then(posts => {
        Promise.all(posts).then(posts => {
          this.setState({
            posts
          });
        });
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log("errr", error.response);
      });
  }

  showFullPost(id) {
    this.props.history.push(`/post/${id}`);
  }

  renderPosts = () => {
    return this.state.posts.map(item => {
      return (
        <div
          key={createID()}
          onClick={() => {
            this.showFullPost(item.id);
          }}
        >
          <div>
            <div>
              <img src={item.autor.avatar} alt="" />
              <span>{item.autor.name}</span>
            </div>
            <div>
              <span>{prettyDate(item.createdAt)}</span>
            </div>
            <span>{item.title}</span>
            <div>
              <span> {item.text}</span>
            </div>
            <div>
              {item.images.map(img => (
                <img key={createID()} src={img.src} alt="some value" />
              ))}
            </div>
            <div>
              <span>Комментариев: </span>
              {item.commentsCounter}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div>{this.renderPosts()}</div>
      </div>
    );
  }
}

const prettyDate = item => {
  let isDate = item.replace(/[T]|[0-9Z.:]{8}$/gi, " ");
  return isDate;
};

const findById = async authorId => {
  let token = localStorage.getItem("token");
  const ssp = await axios.get(`http://localhost:5000/api/user/${authorId}`, {
    headers: { authorization: token }
  });
  return {
    name: ssp.data.firstName + " " + ssp.data.lastName,
    avatar: ssp.data.avatar
  };
};
