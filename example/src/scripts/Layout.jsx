import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return <div className="main-layout">{children}</div>;
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
