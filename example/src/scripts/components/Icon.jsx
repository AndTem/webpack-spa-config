import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ url, viewBox, className, ...props }) => (
  <svg className={className} viewBox={viewBox} {...props}>
    <use xlinkHref={url} />
  </svg>
);

Icon.defaultProps = {
  viewBox: '0 0 16 16'
};

Icon.propTypes = {
  viewBox: PropTypes.string,
  className: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default Icon;
