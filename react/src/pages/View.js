
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './View.css'
import CardDataService from "../services/card.service";
import Info from '../components/Info';

function View() {

  const [card, setCard] = useState({});
  const { id } = useParams();

  useEffect(() => {
    CardDataService.get(id)
      .then(response => {
        setCard(response.data);
        console.log("load", response.data);

        const img = `data:image/jpeg;base64,${response.data.file_link_background}`;
        console.log(img)

      })
      .catch(e => {
        console.log(e);
      });
  }, [id]);



  return (
    <div className='position-view' style={{ backgroundColor: card.color_secondary }}>
      <div className='block-card'>
        <Info information={card} />
      </div>
    </div>
  )
}


export default View;
