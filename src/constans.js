const API_URL = 'https://api.rawg.io/api'
const DEFAULT_QUERY_STRING = `?parent_platforms=1,2,3,7&stores=1,2,3,6,7,11&exclude_additions=true&key=${import.meta.env.VITE_RAWG_API}`;

export {
  API_URL,
  DEFAULT_QUERY_STRING
}
