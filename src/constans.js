const API_URL = 'https://api.rawg.io/api'
const DEFAULT_QUERY_STRING = `?parent_platforms=1,2,3,7&stores=1,2,3,6,7,11&exclude_additions=true&key=${
  import.meta.env.VITE_RAWG_API
}`
const API_KEY_PARAM = `key=${import.meta.env.VITE_RAWG_API}`
const filterItemIds = {
  genre: 1,
  orderBy: 2,
  date: 3
}
const orderByItems = [
  {
    name: 'Name',
    slug: 'name'
  },
  {
    name: 'Released',
    slug: 'released'
  },
  {
    name: 'Added',
    slug: 'added'
  },
  {
    name: 'Created',
    slug: 'created'
  },
  {
    name: 'Rating',
    slug: 'rating'
  }
].map((item) => {
  return {
    ...item,
    exclusive: 1,
    filterId: filterItemIds.orderBy
  }
})
export {
  API_URL,
  DEFAULT_QUERY_STRING,
  API_KEY_PARAM,
  filterItemIds,
  orderByItems
}
