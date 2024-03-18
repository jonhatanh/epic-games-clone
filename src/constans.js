const API_URL = 'https://api.rawg.io/api/'
const DEFAULT_QUERY_STRING = `?platform=4&stores=1&exclude_additions=true&key=${import.meta.env.VITE_RAWG_API}&`

export {
  API_URL,
  DEFAULT_QUERY_STRING
}
