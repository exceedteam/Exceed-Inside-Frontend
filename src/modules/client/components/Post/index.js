import React from "react";
import axios from "axios";
import { createID } from "../../../../services";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      postData: {},
      id: this.props.match.params.id
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/post/${this.state.id}`, {
        headers: { authorization: token }
      })
      .then(response => {
        this.setState({ postData: response.data, loaded: true });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <div>
        {this.state.loaded && (
          <div>
            <div>
              <span>{this.state.postData.createdAt}</span>
            </div>
            <span>{this.state.postData.title}</span>
            <div>
              <span> {this.state.postData.text}</span>
            </div>
            <div>
              {this.state.postData.images.map(img => (
                <img key={createID()} src={img.src} alt="some value" />
              ))}
            </div>
            <div>
              <span>Комментариев: </span>
              {this.state.postData.commentsCounter}
            </div>
          </div>
        )}
        {!this.state.loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
