import FilterItem from '@/components/FilterItem/FilterItem'
import classes from './Filters.module.css'
import { useState } from 'react'
import Button from '@/components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FILTERS_ID, FILTERS_ITEMS_ORDER_BY } from '@/constans'
import PropTypes from 'prop-types'
import { useFilters } from '@/hooks/useFilters'
export default function Filters ({ genres = null, currentFilters = {} }) {
  const {
    filters,
    clearFilters,
    toggleFilter,
    descendingOrder,
    setDescendingOrder,
    toDate,
    setToDate,
    fromDate,
    setFromDate,
    handleDateFilter
  } = useFilters(currentFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  function isActive (filterSlug) {
    return (
      filters.findIndex((filterItem) => filterItem.slug === filterSlug) !== -1
    )
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

Filters.propTypes = {
  genres: PropTypes.object,
  currentFilters: PropTypes.object
}
