import React, { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getCurrentUserId } from '../../../../services/helpers';
import './AdminProfile.scss';

const AdminProfile = ({ profile, fetchUserProfile, loading }) => {
  
    useEffect(() => {
      if ( !profile.email) fetchUserProfile(getCurrentUserId());
    }, [fetchUserProfile, profile.email]);
    
    
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
            circular
            src={profile.avatar}
          />
        </div>
        <div className='content'>
          <h3>{`${profile.fullName}`}</h3>
          <p>{`${profile.position}`}</p>
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
    fullName: PropTypes.string,
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
