import QRCode from 'react-qr-code';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import trait from '../assets/trait-allview.svg'
import modifier from '../assets/Picto-modifier.svg'
import dupliquer from '../assets/Picto-dupliquer.svg'
import supprimer from '../assets/picto-Supprimer.svg'
import telecharger from '../assets/telecharger.svg'
import test from '../assets/user.jpg'
import html2canvas from 'html2canvas';
import CardDataService from "../services/card.service";
import './ViewViewall.css';

function ViewViewall({ card, isSelected, onSelect }) {

    const [isViewCardVisible, setIsViewCardVisible] = useState(false);

    const handleDownload = async () => {
        const element = document.getElementById('qrcode-' + card.id),
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    const handleDelete = () => {
        CardDataService.delete(card.id)
            .then((response) => {
                console.log(response.data.message);
                window.location.reload(); // Force l'actualisation
            })
            .catch((error) => {
                console.error("Error deleting card:", error);
            });
    };



    return (
        <div className='one-card' key={card.id}>
            <div className={`profile-card ${isSelected ? 'selected' : ''}`}>
                <div className='img-nom-prenom'>
                    <img className='test-img' src={"http://localhost:8080/" + card.file_link_profil} />
                    {card.profile_picture}
                    <button className='select-card' onClick={() => onSelect(card)}>Select</button>
                    <div className='nom-prénom-allview'>
                        {card.first_name}<br></br>{card.last_name}
                    </div>
                </div>
                <div className='position-trait'>
                    <img className='trait' src={trait} alt="trait" />
                    <div className='mdd'>
                        <a><img src={modifier} alt="Modify" />Modify</a>
                        <a><img src={dupliquer} alt="Duplicate" />Duplicate</a>
                        <a onClick={handleDelete}><img src={supprimer} alt="Delete" />Delete</a>
                    </div>
                </div>
            </div>
            <div className='QR-download'>
            <Link to={"/view/" + card.id}>
                <div className='blanc-qr' id={"qrcode-" + card.id} onMouseEnter={() => setIsViewCardVisible(true)} onMouseLeave={() => setIsViewCardVisible(false)}>
                    
                        
                            {isViewCardVisible && <span className="view-card-text">View Card</span>}
                        
                    

                    <QRCode
                        style={{ height: "auto", maxWidth: "125px", width: "150px" }}
                        value={window.location.origin + "/view/" + card.id}
                        fgColor={card.qr_code}
                        level="H"
                        viewBox={`0 0 256 256`}
                    />
                </div>
                </Link>
                <div className='mdd-d'>
                    <a onClick={handleDownload}><img src={telecharger} alt="telecharger" />Download</a>
                </div>
            </div>
        </div>
    );
}

export default ViewViewall;