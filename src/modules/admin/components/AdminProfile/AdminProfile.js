import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getCurrentUserId } from '../../../../services/helpers';
import './AdminProfile.scss';

const AdminProfile = (props) => {
    const [ profileData, setProfileData ] = useState({});
    const { loading } = props;
    
    useEffect(() => {
      const { fetchUserProfile, profile } = props;
      if ( !profile.email)
        fetchUserProfile(getCurrentUserId())
          .then((response) => setProfileData(response));
    }, [ props ]);
    
    
    if (loading) {
      return (
        <div className='AdminProfile'>
          <h1>Loading...</h1>
        </div>
      );
    }
    
    return (
      <div className='AdminProfile'>
        <div className='image'>
          <Image
            size='tiny'
            src={profileData.avatar}
          />
        </div>
        <div className='content'>
          <h3>{`${profileData.firstName} ${profileData.lastName}`}</h3>
          <p>{`${profileData.position}`}</p>
          {/* <span className="extra">Additional Details</span> */}
        </div>
      </div>
    );
    
  }
;

AdminProfile.propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    position: PropTypes.string,
    team: PropTypes.string,
    avatar: PropTypes.string
  }),
  loading: PropTypes.bool
};

AdminProfile.defaultProps = {
  profile: {},
  loading: true
};

export default AdminProfile;
