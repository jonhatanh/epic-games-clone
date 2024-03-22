import { useEffect, useState } from 'react'

export function useMediaQuery (query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const handler = (e) => setMatch(e.matches)
    const matcher = window.matchMedia(query)
    matcher.addEventListener('change', handler)
    return () => {
      matcher.removeEventListener('change', handler)
    }
  }, [])
  return match
}
