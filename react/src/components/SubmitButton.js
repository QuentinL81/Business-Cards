import React from 'react';
import CardDataService from "../services/card.service";
import './SubmitButton.css'


function SubmitButton({ digitalData }) {
  const handleSubmit = () => {
    // Actions to be performed when the submit button is clicked
    console.log('Button "Generate Card" clicked');

    // Call the saveCard function with the digitalData
    CardDataService.create(digitalData)
      .then(response => {
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  };

  return (
    <div className='button-submit'>
      <button className="SubmitButton" type="button" onClick={handleSubmit}>
        Generate Card
      </button>
    </div>
  );
}

export default SubmitButton;

