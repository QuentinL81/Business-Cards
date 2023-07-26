import QRCode from 'react-qr-code';
import { Link } from "react-router-dom";
import trait from '../assets/trait-allview.svg'
import modifier from '../assets/Picto-modifier.svg'
import dupliquer from '../assets/Picto-dupliquer.svg'
import supprimer from '../assets/picto-Supprimer.svg'
import telecharger from '../assets/telecharger.svg'
import test from '../assets/user.jpg'
import html2canvas from 'html2canvas';
import CardDataService from "../services/card.service";

function ViewViewall({ card }) {

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
        // Faites une requête DELETE vers votre API pour supprimer la carte avec l'ID spécifique
        CardDataService.delete(card.id)
            .then((response) => {
                // La carte a été supprimée avec succès, mettez à jour l'interface utilisateur en conséquence
                // Par exemple, supprimez la carte de la liste des cartes affichées
                console.log(response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                // Gérer les erreurs si la suppression de la carte échoue
                console.error("Error deleting card:", error);
            });
    };



    return (
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
                        <a onClick={handleDelete}><img src={supprimer} alt="Delete" />Delete</a>
                    </div>
                </div>
            </div>
            <div className='QR-download'>
                <div className='blanc-qr' id={"qrcode-" + card.id}>
                    <QRCode
                        style={{ height: "auto", maxWidth: "125px", width: "150px" }}
                        value={window.location.origin + "/view/" + card.id}
                        fgColor={card.qr_code}
                        level="H"
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='mdd-d'>
                    <a onClick={handleDownload}><img src={telecharger} alt="telecharger" />Download</a>
                </div>
            </div>

            <Link to={"/view/" + card.id}>
                P
            </Link>

        </div>
    );
}

export default ViewViewall;