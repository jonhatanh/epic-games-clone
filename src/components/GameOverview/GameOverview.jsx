import { useLoaderData } from "react-router-dom";
import classes from './GameOverview.module.css'
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
          <div>
            <div className={classes.mainImage}>
              <img src={game.background_image} alt="Game Image" />
            </div>
            <div className={classes.gallery}>
              <button>Left</button>
              <div>
                <img src={game.background_image} alt="Game Image" />
                <img src={game.background_image} alt="Game Image" />
                <img src={game.background_image} alt="Game Image" />
              </div>
              <button>Right</button>
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
        <aside></aside>
      </div>
      <div>{/* Archivements */}</div>
      <div>{/* Sistem req */}</div>
    </div>
  );
}

export default GameOverview
