import React from "react";
import jwtDecode from "jwt-decode";
import styles from "./Profile.module.css";
import moment from "moment";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../../redux/actions/users/fetch";
import { editUserProfile } from "../../../redux/actions/users/edit";
import Loader from "../Loader";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.decoded = jwtDecode(token).id;
    this.state = {
      profileData: this.props.profile,
      id: this.props.match.params.id,
      isEdit: false
    };
  }

  getData = input => {
    let file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      const { profileData } = this.state;
      profileData.avatar = base64Image;
      this.setState({ profileData });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
  };

  // search htmlFor a specific user in the DB
  componentDidMount() {
    const { fetchUserProfile, profile } = this.props;
    if (!profile.email)
      fetchUserProfile(this.props.match.params.id).then(profile =>
        this.setState({ profileData: profile })
      );
  }

  // saving changed user data
  submitEditProfile = () => {
    const { profileData, id } = this.state;
    profileData.id = id;
    this.props
      .editUserProfile(profileData)
      .then(res => {
        this.setState({ isEdit: false });
        this.props.history.push(`/user/${this.state.id}`);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  // updating state if decoded.id === params.id
  updateForm = event => {
    const newState = this.state.profileData;
    newState[event.target.id] = event.target.value;
    this.setState({
      profileData: { ...newState }
    });
  };

  // render of the profile edit button if the user is the owner of the account
  editProfile() {
    const { id, isEdit } = this.state;
    if (this.decoded === id) {
      return (
        <div>
          <button
            className={styles.btn}
            onClick={() => {
              this.setState({ isEdit: !isEdit });
            }}
          >
            {" "}
            {isEdit ? "Cancel" : "Edit Profile"}
          </button>
          {isEdit && (
            <button
              className={styles.btn}
              disabled={!this.state.isEdit}
              onClick={this.submitEditProfile}
            >
              Save changes
            </button>
          )}
        </div>
      );
    }
  }

  // render personal user data
  render() {
    const {
      profileData: {
        avatar,
        firstName,
        lastName,
        email,
        age,
        position,
        team,
        aboutInfo
      },
      id
    } = this.state;
    const { loading } = this.props;
    return (
      <div className={styles.container}>
        {!loading && (
          <div className={styles.form}>
            <img src={avatar} alt="" className={styles.avatar} />
            <div className={styles.row}>
              <div className={styles.column}>
                <div>
                  <span className={styles.title}>E-mail: </span>
                  <input
                    id="email"
                    value={email || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span className={styles.title}>First Name: </span>
                  <input
                    id="firstName"
                    value={firstName || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span className={styles.title}>Last Name: </span>
                  <input
                    id="lastName"
                    value={lastName || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span className={styles.title}>Date Of Birth: </span>
                  <input
                    id="age"
                    type="date"
                    min="1900-01-01"
                    max="2001-12-31"
                    value={moment(age).format("YYYY-MM-DD") || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span className={styles.title}>Position: </span>
                  <input
                    id="position"
                    value={position || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.column}>
                <div>
                  <span className={styles.title}>Team: </span>
                  <input
                    id="team"
                    value={team || ""}
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span className={styles.title}>About info</span>
                  <textarea
                    id="aboutInfo"
                    disabled={!this.state.isEdit}
                    onChange={this.updateForm}
                    value={aboutInfo || ""}
                    className={styles.aboutMe}
                  />
                </div>
                {this.editProfile()}
                <div>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      this.props.history.push(`/user/${id}/posts`);
                    }}
                  >
                    Posts of user
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.users.errors,
    loading: state.users.loading,
    profile: state.users.currentUser
  };
};

export default connect(mapStateToProps, { fetchUserProfile, editUserProfile })(
  Profile
);
