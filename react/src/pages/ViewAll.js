import React, { useState, useEffect } from 'react';
import './ViewAll.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";
import Preview from './Preview';
import ViewViewall from '../components/ViewViewall';

function ViewAll(
) {

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        CardDataService.getAll()
            .then(response => {
                setCards(response.data);
                console.log("load", response.data);
                
                // Search for the last card created with a non-null name
                const lastCardWithNonNullName = response.data
                    .filter(card => card.first_name && card.last_name)
                    .sort((a, b) => b.id - a.id)[0];
                // Select the last map found as the default map
                setSelectedCard(lastCardWithNonNullName);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
    };



    return (
        <div className='container m-0 mw-100 p-0'>
            <NavBar />
            <div className='row background'>
                <div className="col-8 blocks" >
                    <div className="banner-card">
                        <div className='banner-title'>
                            <h1>ALL CARDS</h1>
                        </div>
                        <div className="all-cards">
                            {cards.map(card =>
                                <ViewViewall
                                    key={card.id}
                                    card={card}
                                    onClick={() => handleCardClick(card)}
                                    isSelected={selectedCard && selectedCard.id === card.id}
                                    onSelect={handleCardSelect} />
                            )}
                        </div>
                    </div>
                </div>
                <div className='col-4 block_deux'>
                    {selectedCard && <Preview information={selectedCard} />}
                </div>
            </div>
        </div>
    )
}


export default ViewAll;