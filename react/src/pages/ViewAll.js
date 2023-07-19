
import React, { useState, useEffect } from 'react';

import './View.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";

import { Link } from "react-router-dom";

function ViewAll() {

    const [cards, setCards] = useState([]);


    useEffect(() => {
        CardDataService.getAll()
            .then(response => {
                setCards(response.data);
                console.log("load", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);



    return (
        <div>
            <NavBar />
            <div className="row" >
                <div className="" style={{ marginTop: 300 + 'px' }}>
                    {cards.map(card =>
                        <div className="col-1" key={card.id}>{card.id} / {card.email}

                            <Link
                                to={"/cards/" + card.id}
                            >
                                Preview
                            </Link></div>   
                    )}
                </div>
            </div>
        </div>
    )
}


export default ViewAll;