import './Home.css'
import beorn_image from '../assets/Logo-beorn-blanc.svg'
import plus from '../assets/Picto-Plus_bouton-accueil.svg'

function Home() {
  return (
    <div className="all_home">
      <div className='backgroundH' />
      <img className='beorn_image' src={beorn_image} alt="Beorn Logo" />
      <div className='lien'>
        <div className='create_img'>
          <a className='create' href='/create'>
            <img src={plus} alt="Plus-logo" />
            <p>
              CREATE <br />A NEW <br />V-CARD
            </p>
          </a>
        </div>
        <a className='view' href='/cards'> <u>VIEW ALREADY SAVED V-CARD</u></a>
      </div>
    </div>
  )
}

export default Home;

