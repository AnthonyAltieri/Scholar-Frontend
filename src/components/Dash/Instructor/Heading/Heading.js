import React from 'react';
import Active from './Active';

const Heading = ({
  text,
  hasActive,
  isActive,
  isLeft,
}) => {
  if (!hasActive) {
    return (
      <div
        className="heading"
        style={{
          textAlign: !!isLeft ? 'left' : 'center',
        }}
      >
        <h2 className={`header ${!!isLeft ? 'left' : ''}`}>{text}</h2>
      </div>
    )
  }

  return (
      <div
        className="heading r"
        style={{
          textAlign: !!isLeft ? 'left' : 'center',
          width: !!isLeft ? null : '100%',
        }}
      >
        <h2 className={`header ${!!isLeft ? 'left' : ''}`}>{text}</h2>
        <Active isActive={isActive} />
      </div>
  );
}

export default Heading;
