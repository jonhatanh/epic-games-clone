import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import FilterItem from '@/components/FilterItem/FilterItem'
import classes from './Filters.module.css'
import { useEffect, useState } from 'react'
import Button from '../../../../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FILTERS_ID, FILTERS_ITEMS_ORDER_BY } from '@/constans'

export default function Filters ({ genres = null, currentFilters = {} }) {
  const [descendingOrder, setDescendingOrder] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filters, setFilters] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const navigate = useNavigate()

  // Loads filters
  useEffect(() => {
    console.log({ currentFilters })
    if (currentFilters.genres) {
      currentFilters.genres.forEach((filter) => toggleFilter(filter))
    }
    if (currentFilters.orderBy) {
      toggleFilter(currentFilters.orderBy)
    }
    if (currentFilters.ordering) {
      setToDate(currentFilters.dates.to)
    }
    if (currentFilters.descending !== undefined) {
      setDescendingOrder(currentFilters.descending)
    }
    if (currentFilters.dates) {
      setFromDate(currentFilters.dates.from)
      setToDate(currentFilters.dates.to)
      handleDateFilter()
    }
    return clearFilters
  }, [])

  useEffect(() => {
    const newURL = new URL(window.location.href)

    const genreFilters = filters
      .filter((item) => item.filterId === FILTERS_ID.genre)
      .map((item) => item.slug)
      .join(',')

    const orderByFilters = filters
      .filter((item) => item.filterId === FILTERS_ID.orderBy)
      .map((item) => (descendingOrder ? `-${item.slug}` : item.slug))
      .join(',')

    const dateFilter = filters.filter(
      (item) => item.filterId === FILTERS_ID.date
    )[0]

    genreFilters && newURL.searchParams.set('genres', genreFilters)
    orderByFilters && newURL.searchParams.set('ordering', orderByFilters)
    dateFilter &&
      newURL.searchParams.set('dates', `${dateFilter.from},${dateFilter.to}`)
    if (filters.length > 0) { navigate(newURL.pathname + newURL.search) }
  }, [filters, descendingOrder, navigate])

  function toggleFilter (filter) {
    const index = filters.findIndex(
      (filterItem) => filterItem.slug === filter.slug
    )
    if (index === -1) {
      if (filter.exclusive) {
        const exclusiveIndex = filters.findIndex(
          (filterItem) => filterItem.exclusive === filter.exclusive
        )
        setFilters((prev) =>
          exclusiveIndex === -1
            ? [...prev, filter]
            : prev.toSpliced(exclusiveIndex, 1, filter)
        )
      } else {
        setFilters((prev) => [...prev, filter])
      }
    } else {
      setFilters((prev) => prev.toSpliced(index, 1))
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
    setFilters((prev) =>
      index === -1 ? [...prev, filter] : prev.toSpliced(index, 1, filter)
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
        filterId: FILTERS_ID.date
      })
    } else {
      const index = filters.findIndex(
        (filterItem) => filterItem.slug === 'dateFilter'
      )
      if (index !== -1) {
        setFilters((prev) => prev.toSpliced(index, 1))
      }
    }
  }

  function clearFilters () {
    console.log('cleaning')
    setFilters([])
    setFromDate('')
    setToDate('')
    setDescendingOrder(false)
    navigate('.')
  }
  return (
    <aside className={`${classes.filters} ${filtersOpen ? classes.open : ''}`}>
      <h4 onClick={() => setFiltersOpen(!filtersOpen)}>
        Filters <FontAwesomeIcon fontSize='15px' icon={faFilter} />
      </h4>
      <div className={classes.filtersBody}>
        {filters.length > 0 && (
          <div className={classes.filterClear}>
            <button onClick={clearFilters}>
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
          {genres && (
            <FilterItem title='Genres'>
              {genres.results.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() =>
                    toggleFilter({ ...genre, filterId: FILTERS_ID.genre })}
                >
                  {genre.name}
                  {isActive(genre.slug) && (
                    <FontAwesomeIcon
                      style={{ marginLeft: '5px' }}
                      icon={faCheck}
                    />
                  )}
                </li>
              ))}
            </FilterItem>
          )}
          <FilterItem title='Order By'>
            {FILTERS_ITEMS_ORDER_BY.map((item) => (
              <li key={item.slug} onClick={() => toggleFilter(item)}>
                {item.name}
                {isActive(item.slug) && (
                  <FontAwesomeIcon
                    style={{ marginLeft: '5px' }}
                    icon={faCheck}
                  />
                )}
              </li>
            ))}
            <li>
              <input
                type='checkbox'
                id='reverseSort'
                checked={descendingOrder}
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
            <Button onClick={handleDateFilter} bgColor='gray' size='large'>
              Filter
            </Button>
          </FilterItem>
        </div>
      </div>
    </aside>
  )
}
