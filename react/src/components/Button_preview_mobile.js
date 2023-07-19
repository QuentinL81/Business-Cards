import React from 'react';
import collapse from '../assets/svg-collapse.svg'
import "./Button_preview_mobile.css"

export default function Button_preview_mobile({
}) {
    return (
        <div className='all-button-preview'>
            <div className='bouton-preview'>
                <div className='circle_preview_button'>
                    <button className="btn btn-primary bouton-principal" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                        <img className='svg-ferme' src={collapse} alt="collapse" />
                    </button>
                </div>
                <h5 className="offcanvas-title" id="offcanvasBottomLabel">PREVIEW</h5>
            </div>
        </div>
    );
}