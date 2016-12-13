import React from 'react';
import Heading from '../../Heading/Heading'

const FloatingHeading = () => (
  <div className="floating-heading">
    <Heading
      text="Assessment Bank"
    />
    <div className="r fullwidth">
      <div className="partition-half">
        <p className="bank-section">BANK</p>
      </div>
      <div className="partition-half">
        <p className="bank-section">QUEUE</p>
      </div>
    </div>
  </div>
);

export default FloatingHeading;
