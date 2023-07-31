import QRCode from 'react-qr-code';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import trait from '../assets/trait-allview.svg'
import modify from '../assets/Picto-modifier.svg'
import duplicate from '../assets/Picto-dupliquer.svg'
import remove from '../assets/picto-Supprimer.svg'
import download from '../assets/telecharger.svg'
import html2canvas from 'html2canvas';
import CardDataService from "../services/card.service";
import './ViewViewall.css';


function ViewViewall({ card, isSelected, onSelect }) {

    const [isViewCardVisible, setIsViewCardVisible] = useState(false);

    //Function Download QRCode
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

    // Function Delete
    const handleDelete = () => {
        CardDataService.delete(card.id)
            .then((response) => {
                console.log(response.data.message);
                window.location.reload(); // updated page
            })
            .catch((error) => {
                console.error("Error deleting card:", error);
            });
    };

    // Function Duplicate
    const handleDuplicate = () => {
        CardDataService.duplicate(card)
            .then((response) => {
                console.log("Card duplicated successfully:", response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error duplicating card:", error);
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
                        <a><img src={modify} alt="Modify" />Modify</a>
                        <a onClick={handleDuplicate}><img src={duplicate} alt="Duplicate" />Duplicate</a>
                        <a onClick={handleDelete}><img src={remove} alt="Delete" />Delete</a>
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
                    <a onClick={handleDownload}><img src={download} alt="download" />Download</a>
                </div>
            </div>
        </div>
    );
}

export default ViewViewall;