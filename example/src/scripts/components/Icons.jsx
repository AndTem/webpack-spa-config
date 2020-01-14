import React from 'react';

import cameraIcon from 'sprite/camera-icon.svg';

import Icon from './Icon';

const CameraIcon = props => (
  <Icon
    width={34}
    height={34}
    {...props}
    id={cameraIcon.id}
    viewBox={cameraIcon.viewBox}
  />
);

export { CameraIcon };
