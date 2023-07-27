
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
                        <h1>ALL CARDS</h1>

                        <div className="all-cards">
                            {cards.map(card =>
                            {
                                console.log("file_link_background", card.file_link_background.data)
                                if (card.file_link_background) {

                            
                                    var image = btoa(String.fromCharCode.apply(card.file_link_background)).toString("base64");
                                    console.log("image", image)
                                }
                                return (
                                <div className='one-card' key={card.id}>
                                    <div className='profile-card'>
                                    <img src={"data:image/png;base64," + card.file_link_background}  />

                                        {card.profile_picture}
                                        <div className='nom-prénom-allview'>
                                            {card.first_name}<br></br>{card.last_name}
                                        </div>
                                        <img className='trait' src={trait} alt="trait" />
                                        <div className='mdd'>
                                            <a><img src={modifier} alt="Modify" />Modify</a>
                                            <a><img src={dupliquer} alt="Duplicate" />Duplicate</a>
                                            <a><img src={supprimer} alt="Delete" />Delete</a>
                                        </div>
                                    </div>
                                    <div>
                                        <QRCode 
                                            style={{ height: "auto", maxWidth: "150px", width: "150px" }}
                                            value={valueQRCode}
                                            fgColor={colorQRCode}
                                            level="H"
                                            viewBox={`0 0 256 256`}
                                        />
                                        <a><img src={telecharger} alt="telecharger" />Download</a>
                                    </div>

                                    <Link to={"/view/" + card.id}>
                                        Preview
                                    </Link>
                                </div>)
                            }
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