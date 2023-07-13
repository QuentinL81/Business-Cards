import React from 'react';
import CardDataService from "../services/card.service";
import './SubmitButton.css'
 

function SubmitButton({ digitalData }) {

  const handleSubmit = () => {
    // Actions to be performed when the submit button is clicked
    console.log('Button "Generate Card" clicked');

    console.log(digitalData)
    // Vérifier tous les champs du modèle
    checkFields(digitalData)

    //Si il ne manque aucun champ 
      // Call the saveCard function with the digitalData
      CardDataService.create(digitalData)
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    //Sinon afficher l'erreur

  };

  const checkFields = (data) => {

  }

  return (
    <div className='button-submit'>
      <button className="SubmitButton" type="button" onClick={handleSubmit} >
        Generate Card
      </button>
    </div>
  );
}

export default SubmitButton;

