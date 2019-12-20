import React from "react";
import request from "../../../../services/api/axios/index";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      id: this.props.match.params.id,
      loaded: false
    };
  }

  // search for a specific user in the DB
  componentDidMount() {
    request
      .getUserProfile({
        id: this.state.id
      })
      .then(res => {
        this.setState({ profileData: res.profile, loaded: res.loaded });
      })
      .catch(error => {
        console.log("err", error);
      });
  }

  // go to all user posts
  showPostsOfUser(id) {
    this.props.history.push(`/user/${id}/posts`);
  }

  // render personal user data
  render() {
    return (
      <div>
        {this.state.loaded && (
          <div>
            <div>
              <img src={this.state.profileData.avatar} alt="" />
            </div>
            <div>
              <span>First Name: </span>
              {this.state.profileData.firstName}
            </div>
            <div>
              <span>Last Name: </span>
              {this.state.profileData.lastName}
            </div>
            <div>
              <span>email: </span>
              {this.state.profileData.email}
            </div>
            <div>
              <span>Age: </span>
              {this.state.profileData.age}
            </div>
            <div>
              <span>position: </span>
              {this.state.profileData.position}
            </div>
            <div>
              <span>Team: </span>
              {this.state.profileData.team}
            </div>
            <div>
              <span>About info: </span>
              {this.state.profileData.aboutInfo}
            </div>
            <input type="button" onClick={() => {this.showPostsOfUser(this.state.id)}} value="all posts of user" />
          </div>
        )}
        {!this.state.loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
