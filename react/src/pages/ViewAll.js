import React, { useState, useEffect } from 'react';
import './ViewAll.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";
import Preview from './Preview';
import ViewViewall from '../components/ViewViewall';

function ViewAll(
) {

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
                                <ViewViewall card={card}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className='col-4 block_deux'>
                    {cards.map(card =>
                        <Preview
                            information={card}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}


export default ViewAll;