import { useEffect, useRef, useState } from 'react';
import { FilterOrderByItem, FILTERS_ID } from '../constans';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiltersType, GenreTypeWithFilter } from '@/utils/helpersApi';

type DateFilterType = {
  name: string;
  slug: string;
  from: string;
  to: string;
  exclusive: 2;
  filterId: typeof FILTERS_ID.date;
}
type FilterItemsType = GenreTypeWithFilter | FilterOrderByItem | DateFilterType
type ArrayFiltersType = FilterItemsType[]

function isDateFilter (filter: FilterItemsType): filter is DateFilterType {
  return filter?.filterId === FILTERS_ID.date
}
function isFilterOrderByOrDate (filter: FilterItemsType): filter is FilterOrderByItem | DateFilterType {
  return filter?.filterId === FILTERS_ID.orderBy || filter?.filterId === FILTERS_ID.date
}

export function useFilters (currentFilters: FiltersType) {
  const [descendingOrder, setDescendingOrder] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filters, setFilters] = useState<ArrayFiltersType>([])
  const navigate = useNavigate()
  const location = useLocation()
  const firstLoadRef = useRef(true)

  // Loads filters
  useEffect(() => {
    const newFiltersState: ArrayFiltersType = []
    if (currentFilters.genres) {
      newFiltersState.push(...currentFilters.genres)
    }
    if (currentFilters.orderBy) {
      newFiltersState.push(currentFilters.orderBy)
    }
    if (currentFilters.descending !== undefined) {
      setDescendingOrder(currentFilters.descending)
    }
    if (
      currentFilters.dates &&
      currentFilters.dates.from &&
      currentFilters.dates.to
    ) {
      setFromDate(currentFilters.dates.from)
      setToDate(currentFilters.dates.to)
      newFiltersState.push({
        name: `Date from ${currentFilters.dates.from} to ${currentFilters.dates.to}`,
        slug: 'dateFilter',
        from: currentFilters.dates.from,
        to: currentFilters.dates.to,
        exclusive: 2,
        filterId: FILTERS_ID.date
      })
    }
    setFilters(newFiltersState)

    return () => {
      firstLoadRef.current = true
    };
  }, [])

  useEffect(() => {
    const newURL = new URL(
      window.location.origin + location.pathname + location.search
    )

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

    genreFilters
      ? newURL.searchParams.set('genres', genreFilters)
      : newURL.searchParams.delete('genres')
    orderByFilters
      ? newURL.searchParams.set('ordering', orderByFilters)
      : newURL.searchParams.delete('ordering')
    isDateFilter(dateFilter)
      ? newURL.searchParams.set('dates', `${dateFilter.from},${dateFilter.to}`)
      : newURL.searchParams.delete('dates')
    if (filters.length > 0) {
      if (!firstLoadRef.current) {
        newURL.searchParams.set('page', '1')
      }
      firstLoadRef.current = false
      navigate(newURL.pathname + newURL.search)
    }
  }, [filters, descendingOrder, navigate])

  function toggleFilter (filter: FilterItemsType) {
    const index = filters.findIndex(
      (filterItem) => filterItem.slug === filter.slug
    )
    if (index === -1) {
      // if (filter.exclusive) {
      if (isFilterOrderByOrDate(filter)) {
        const exclusiveIndex = filters.findIndex(
          (filterItem) => {
            if(!isFilterOrderByOrDate(filterItem)) return false
            return filterItem.exclusive === filter.exclusive
          }
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
  function addDateFilter (filter: FilterItemsType) {
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
    setFilters([])
    setFromDate('')
    setToDate('')
    setDescendingOrder(false)
    navigate({ search: '?page=1' })
  }
  return {
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
  };
}
