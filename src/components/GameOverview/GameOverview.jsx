import { useLoaderData } from "react-router-dom";
import classes from './GameOverview.module.css'
import { randomPriceString } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
const GameOverview = () => {
  const { game } = useLoaderData();
  console.log(game);
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{game.name}</h1>
      <nav>
        <ul>
          <li className={classes.active}>Overview</li>
          <li>Logros</li>
        </ul>
      </nav>
      <div className={classes.gameDetails}>
        {/* Game Info */}
        <main>
          {/* Media Player */}
          <div className={classes.galleryContainer}>
            <div className={classes.mainImage}>
              <img src={game.background_image} alt="Game Image" />
            </div>
            <div className={classes.gallery}>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div>
                <img
                  className={classes.active}
                  src={game.background_image}
                  alt="Game Image"
                />
                <img src={game.background_image} alt="Game Image" />
                <img src={game.background_image} alt="Game Image" />
              </div>
              <button>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
            voluptate dolor voluptatibus sunt at odit expedita quasi nostrum
            ducimus animi harum commodi, eum, ad velit ab. Maxime, autem.
            Architecto, ea?
          </p>
        </main>
        {/* Game checkout */}
        <aside>
          <img src={game.background_image} alt="Game Background Image" />
          <span>{randomPriceString()}</span>
          <button>BUY NOW</button>
          <button>ADD TO CART</button>
          <button>ADD TO WISHLIST</button>
        </aside>
      </div>
      <div>{/* Archivements */}</div>
      <div>{/* Sistem req */}</div>
    </div>
  );
}

export default GameOverview
