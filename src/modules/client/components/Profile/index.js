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
    const {
      avatar,
      firstName,
      lastName,
      email,
      age,
      position,
      team,
      aboutInfo
    } = this.state.profileData;
    const { loaded, id } = this.state;
    return (
      <div>
        {loaded && (
          <div>
            <div>
              <img src={avatar} alt="" />
            </div>
            <div>
              <span>First Name: </span>
              {firstName}
            </div>
            <div>
              <span>Last Name: </span>
              {lastName}
            </div>
            <div>
              <span>email: </span>
              {email}
            </div>
            <div>
              <span>Age: </span>
              {age}
            </div>
            <div>
              <span>position: </span>
              {position}
            </div>
            <div>
              <span>Team: </span>
              {team}
            </div>
            <div>
              <span>About info: </span>
              {aboutInfo}
            </div>
            <input
              type="button"
              onClick={() => {
                this.showPostsOfUser(id);
              }}
              value="all posts of user"
            />
          </div>
        )}
        {!loaded && <h1>Loading...</h1>}
      </div>
    );
  }
}
