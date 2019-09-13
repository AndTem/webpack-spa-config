import React from 'react';

import userAvatar from 'images/user-avatar.png';

import { CameraIcon } from '../../components/Icons';

const MainPage = () => {
  return (
    <div className="main-page">
      <h1 className="main-page__title">Main page</h1>
      <img className="main-page__user-avatar" src={userAvatar} alt="avatar" />
      <CameraIcon />
    </div>
  );
};

export default MainPage;
