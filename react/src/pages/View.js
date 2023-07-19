
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './View.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";
import Preview from "./Preview";

function View() {

const [card, setCard] = useState({});
    const { id } = useParams();
    
      useEffect(() => {
        CardDataService.get(id)
            .then(response => {
                setCard(response.data);
                console.log("load", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [id]);



  return (
    <div>
      <NavBar />
    </div>
  )
}


export default View;
