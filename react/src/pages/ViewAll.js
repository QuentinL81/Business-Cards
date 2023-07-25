import React, { useState, useEffect } from 'react';

import './ViewAll.css'
import NavBar from '../components/Navbar';
import CardDataService from "../services/card.service";
import { Link } from "react-router-dom";
import Preview from './Preview';
import trait from '../assets/trait-allview.svg'
import modifier from '../assets/Picto-modifier.svg'
import dupliquer from '../assets/Picto-dupliquer.svg'
import supprimer from '../assets/picto-Supprimer.svg'
import telecharger from '../assets/telecharger.svg'
import QRCode from 'react-qr-code';
import test from '../assets/user.jpg'

function ViewAll(
    valueQRCode,
    colorQRCode,
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
                                <div className='one-card' key={card.id}>
                                    <div className='profile-card'>
                                        <div className='img-nom-prenom'>
                                            <img className='test-img' src={test} />
                                            {card.profile_picture}
                                            <div className='nom-prénom-allview'>
                                                {card.first_name}<br></br>{card.last_name}
                                            </div>
                                        </div>
                                        <div className='position-trait'>
                                            <img className='trait' src={trait} alt="trait" />
                                            <div className='mdd'>
                                                <a><img src={modifier} alt="Modify" />Modify</a>
                                                <a><img src={dupliquer} alt="Duplicate" />Duplicate</a>
                                                <a><img src={supprimer} alt="Delete" />Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='QR-download'>
                                        <div className='blanc-qr'>
                                            <QRCode
                                                style={{ height: "auto", maxWidth: "125px", width: "150px" }}
                                                value={valueQRCode}
                                                fgColor={colorQRCode}
                                                level="H"
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                        <div className='mdd-d'>
                                            <a><img src={telecharger} alt="telecharger" />Download</a>
                                        </div>
                                    </div>

                                     <Link to={"/view/" + card.id}>
                                        P
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