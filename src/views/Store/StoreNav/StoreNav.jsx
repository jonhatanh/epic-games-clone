import { Link, NavLink } from "react-router-dom";
import classes from "./StoreNav.module.css";
import { useRef, useState } from "react";
import { API_URL, DEFAULT_QUERY_STRING } from "../../../constans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export default function StoreNav() {
  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : isPending ? "" : "";

  const typingRef = useRef(null);
  const abortController = useRef(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [games, setGames] = useState(null)
  const [openGamesTab, setOpenGamesTab] = useState(false)
  function handleChange(e) {
    clearTimeout(typingRef.current);
    abortController.current?.abort()
    setLoading(true)
    setError(false)
    typingRef.current = setTimeout(() => {
      const value = e.target.value.trim();
      if (value === "") {
        setLoading(false)
        setGames(null)
        return
      };
      abortController.current = new AbortController()
      const signal = abortController.current.signal;
      const apiUrl = `${API_URL}/games${DEFAULT_QUERY_STRING}&search=${value}&page_size=5`

      fetch(apiUrl, {signal}).then(res=> {
        if(res >= 400) {
          throw new Error('Error fetching games :(')
        }
        return res.json()
      }).then(gamesResponse => {
        setGames(gamesResponse.results)
      }).catch(error => {
        setError(error)
      }).finally(()=> {
        setLoading(false)
      })
      typingRef.current = null;
    }, 700);
  }


  function handleOpenTab(open) {
    if(open && (error || games?.length > 0)) {
    // if(open) {
      setOpenGamesTab(true)

    } else {
      setOpenGamesTab(false)
    }
  }

  return (
    <nav className={classes.nav}>
      <div className={classes.searchContainer}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search store"
          className={classes.searchBar}
          onChange={(e) => handleChange(e)}
          onFocus={() => handleOpenTab(true)}
          onBlur={() => handleOpenTab(false)}
          autoComplete="off"
        />
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${loading ? classes.active : ""} fa-spin`}
        />
        <section className={openGamesTab ? classes.open : ''}>
          {error && <p>{error}</p>}
          {games?.map((game) => {
            return (
              <Link key={game.id} to={`/store/games/${game.id}`}>
                <img src={game.background_image} alt={`${game.name} cover`} />
                <h3>{game.name}</h3>
              </Link>
            );
          })}
        </section>
      </div>
      <NavLink className={navClass} to="." end>
        Discover
      </NavLink>
      <NavLink className={navClass} to="browse">
        Browse
      </NavLink>
    </nav>
  );
}
