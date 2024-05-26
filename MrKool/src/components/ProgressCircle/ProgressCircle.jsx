import React from 'react';
import PropTypes from 'prop-types';

const ProgressCircle = ({ progress = 0.75, size = 40 }) => {
  const angle = progress * 360;
  const primaryColor = '#1890ff'; // Replace with your primary color
  const blueAccent = '#40a9ff';  // Replace with your blue accent color
  const greenAccent = '#52c41a'; // Replace with your green accent color

  return (
    <div
      style={{
        background: `radial-gradient(${primaryColor} 55%, transparent 56%),
                     conic-gradient(transparent 0deg ${angle}deg, ${blueAccent} ${angle}deg 360deg),
                     ${greenAccent}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
ProgressCircle.propTypes = {
  progress: PropTypes.number,
  size: PropTypes.number,

};

export default ProgressCircle;
