import './Preview.css'
import React from 'react';
import collapse from '../assets/svg-collapse.svg'
import Info from '../components/Info'

export default function Preview({
  information
}) {
  return (
    <div >
      <div className='placement-preview-mobile'>
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
          <div className='position_circle_header'>
            <div className='circle_preview'>
              <img className='svg-ouvert' src={collapse} alt="collapse" />
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
          </div>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">PREVIEW</h5>
          </div>
          <div className="offcanvas-body small">
            <Info information={information} />
          </div>
        </div>
      </div>



      <div className='preview_banner'>
        <div className='gestion_top'>
          <h2>Preview</h2>
          <div className='haut_preview_noir' />
        </div>
        <div className='all_preview'>
          <Info information={information} />
        </div>
        <div className='preview_back' />
      </div>
    </div>
  );
}
