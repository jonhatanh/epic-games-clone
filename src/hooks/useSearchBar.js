import { useEffect, useRef, useState } from 'react'
import { API_URL, DEFAULT_QUERY_STRING } from '../constans'

export function useSearchBar () {
  const typingRef = useRef(null)
  const abortController = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [games, setGames] = useState([])
  const [openTab, setOpenTab] = useState(false)
  function handleChange (e) {
    clearTimeout(typingRef.current)
    abortController.current?.abort()
    setLoading(true)
    setError(false)
    typingRef.current = setTimeout(() => {
      const value = e.target.value.trim()
      if (value === '') {
        setLoading(false)
        setGames([])
        return
      }
      abortController.current = new AbortController()
      const signal = abortController.current.signal
      const apiUrl = `${API_URL}/games${DEFAULT_QUERY_STRING}&search=${value}&page_size=5`

      fetch(apiUrl, { signal })
        .then((res) => {
          if (res >= 400) {
            throw new Error('Error fetching games :(')
          }
          return res.json()
        })
        .then((gamesResponse) => {
          if (gamesResponse.results.length > 0) {
            setGames(gamesResponse.results)
          } else {
            throw new Error('No game matches :(')
          }
        })
        .catch((error) => {
          setError(error.message)
          setGames([])
        })
        .finally(() => {
          setLoading(false)
        })
      typingRef.current = null
    }, 700)
  }
  useEffect(() => {
    if (games.length > 0 || error) {
      setOpenTab(true)
    }
  }, [games])

  return {
    games,
    loading,
    error,
    handleChange,
    openTab,
    setOpenTab
  }
}
