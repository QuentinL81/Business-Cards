
import React, { useState, useEffect } from 'react';

import './ViewAll.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";
import { Link } from "react-router-dom";
import Preview from './Preview';

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
        <div className='row background'>
            <NavBar />
            <div className="col-8 blocks" >
                <div className="banner-card">
                    <h1>ALL CARDS</h1>

                    <div className="all-cards">
                        {cards.map(card =>
                            <div className='one-card' key={card.id}>
                                <div className='profile-card'>
                                    {card.profile_picture}
                                    <div>
                                        {card.first_name} {card.last_name}
                                    </div>
                                </div>
                                <div>QRCODE</div>

                                <Link to={"/view/" + card.id}>
                                    Preview
                                </Link>
                            </div>
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


        /* <div className='container m-0 mw-100 p-0'>
        <NavBar />
        <div className='row background'>
          <div className='col-8 blocks'>

          </div>
          <div className='col-4 block_deux'>
            <Preview
              information={userInformation}
              colorPrimary={userInformation.colorPrimary}
              colorSecondary={userInformation.colorSecondary}
            />
        </div>
      </div>
      */
    )
}


export default ViewAll;