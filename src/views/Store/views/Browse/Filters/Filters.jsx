import { useRouteLoaderData } from 'react-router-dom'
import FilterItem from '@/components/FilterItem/FilterItem'
import classes from './Filters.module.css'
import { useEffect, useState } from 'react'
import Button from '../../../../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

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
].map((item) =>
  Object.create({
    ...item,
    exclusive: 1,
    filterId: filterItemIds.orderBy
  })
)

export default function Filters () {
  const { genres } = useRouteLoaderData('BrowsePage')
  const [descendingOrder, setDescendingOrder] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filters, setFilters] = useState([])

  useEffect(() => {
    let queryString = '?'

    const genreFilters = filters.filter(item => item.filterId === filterItemIds.genre).map(item => item.slug).join(',')

    const orderByFilters = filters.filter(item => item.filterId === filterItemIds.orderBy).map(item => descendingOrder ? `-${item.slug}` : item.slug).join(',')

    const dateFilter = filters.filter(item => item.filterId === filterItemIds.date)[0]

    queryString += genreFilters ? `genres=${genreFilters}&` : ''
    queryString += orderByFilters ? `ordering=${orderByFilters}&` : ''
    queryString += dateFilter
      ? `dates=${dateFilter.from}.${dateFilter.to}`
      : ''

    queryString = queryString.charAt(queryString.length - 1) === '&' ? queryString.substring(0, queryString.length - 1) : queryString
    console.log(queryString)
  }, [filters, descendingOrder])

  function toggleFilter (filter) {
    const index = filters.findIndex(
      (filterItem) => filterItem.slug === filter.slug
    )
    if (index === -1) {
      if (filter.exclusive) {
        const exclusiveIndex = filters.findIndex(
          (filterItem) => filterItem.exclusive === filter.exclusive
        )
        setFilters(
          exclusiveIndex === -1
            ? [...filters, filter]
            : filters.toSpliced(exclusiveIndex, 1, filter)
        )
      } else {
        setFilters([...filters, filter])
      }
    } else {
      setFilters(filters.toSpliced(index, 1))
    }
  }

  function isActive (filterSlug) {
    return (
      filters.findIndex((filterItem) => filterItem.slug === filterSlug) !== -1
    )
  }
  function addDateFilter (filter) {
    const index = filters.findIndex(
      (filterItem) => filterItem.slug === filter.slug
    )
    setFilters(
      index === -1 ? [...filters, filter] : filters.toSpliced(index, 1, filter)
    )
  }

  function handleDateFilter () {
    if (fromDate && toDate) {
      addDateFilter({
        name: `Date from ${fromDate} to ${toDate}`,
        slug: 'dateFilter',
        from: fromDate,
        to: toDate,
        exclusive: 2,
        filterId: filterItemIds.date
      })
    } else {
      const index = filters.findIndex(
        (filterItem) => filterItem.slug === 'dateFilter'
      )
      if (index !== -1) {
        setFilters(filters.toSpliced(index, 1))
      }
    }
  }
  return (
    <aside className={classes.filters}>
      <h4>Filters</h4>
      {filters.length > 0 && (
        <div className={classes.filterClear}>
          <button onClick={() => setFilters([])}>
            Clear filters <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className={classes.filtersApplied}>
            Active Filters:
            <ul>
              {filters.map((filter) => {
                return <li key={filter.slug}>{filter.name}</li>
              })}
            </ul>
          </div>
        </div>
      )}
      <div>
        <FilterItem title='Genres'>
          {genres.results.map((genre) => (
            <li key={genre.id} onClick={() => toggleFilter({ ...genre, filterId: filterItemIds.genre })}>
              {genre.name}
              {isActive(genre.slug) && (
                <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faCheck} />
              )}
            </li>
          ))}
        </FilterItem>
        <FilterItem title='Order By'>
          {orderByItems.map((item) => (
            <li key={item.id} onClick={() => toggleFilter(item)}>
              {item.name}
              {isActive(item.slug) && (
                <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faCheck} />
              )}
            </li>
          ))}
          <li>
            <input
              type='checkbox'
              id='reverseSort'
              value={descendingOrder}
              onChange={() => setDescendingOrder(!descendingOrder)}
            />
            <label htmlFor='reverseSort' style={{ marginLeft: '5px' }}>
              Descending Order
            </label>
          </li>
        </FilterItem>
        <FilterItem title='By Release Date'>
          <input
            type='date'
            name='fromDate'
            id='fromDateFilter'
            min='1990-01-01'
            max='2030-01-01'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type='date'
            name='toDate'
            id='toDateFilter'
            min='1990-01-01'
            max='2030-01-01'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button onClick={handleDateFilter}>Filter</button>
        </FilterItem>
      </div>
    </aside>
  )
}
