import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import styles from './selectColumnFilter.module.sass'

function SelectColumnFilter(props) {
  const {
    manualFilters,
    options,
    column: {
      Cell: renderCell,
      filterValue,
      setFilter,
      preFilteredRows,
      id,
    },
  } = props

  const getAvailableOptions = useCallback(() => {
    const optionList = new Set()
    preFilteredRows.forEach((row) => {
      const value = row.values[id]
      optionList.add(value)
    })

    return Array.from(optionList).map(value => ({
      value,
      label: renderCell({ value }),
    }))
  }, [renderCell, id, preFilteredRows])

  // 下拉選單選項可以有兩種來源
  // 1. 透過 options 參數直接給
  // 2. 若沒有給 options, 便從當前資料有的值收集
  const optionList = useMemo(
    () => (manualFilters
      ? (options || []) : (options || getAvailableOptions())),
    [getAvailableOptions, manualFilters, options]
  )

  const isOptionValueNumber = useMemo(() => (
    (optionList && optionList.length > 0)
      ? typeof optionList[0].value === 'number'
      : false
  ), [optionList])

  return (
    <select
      className={styles.root}
      value={filterValue}
      onChange={(e) => {
        if (e.target.value === '') { // All
          setFilter(undefined)
        } else {
          const rtValue = isOptionValueNumber
            ? Number(e.target.value) : e.target.value
          setFilter(rtValue)
        }
      }}
    >
      <option value="">{('All')}</option>
      {optionList.map((option, i) => (
        <option
          key={uuid()}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}

SelectColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
  manualFilters: PropTypes.bool,
  options: PropTypes.array,
}

SelectColumnFilter.defaultProps = {
  manualFilters: false,
  options: null,
}

export default SelectColumnFilter
