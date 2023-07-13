import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './OverlayButton.css'
import ampoule from '../assets/ampoule.svg'

export default function OverlayButton({ 
  message 
}) {
  const [placement] = useState('right');

  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${placement}`}>
          {message}
        </Tooltip>
      }
    >
      <p variant="secondary"  className="rounded"><img src={ampoule} className='ampoule' alt="Ampoule-logo" /></p>
    </OverlayTrigger>
  );
}

