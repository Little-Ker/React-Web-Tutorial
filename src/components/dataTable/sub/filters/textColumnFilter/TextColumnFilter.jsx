import React from 'react'
import PropTypes from 'prop-types'
import styles from './textColumnFilter.module.sass'

function TextColumnFilter(props) {
  const {
    column: {
      setFilter,
    },
  } = props

  return (
    <input
      className={styles.root}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          setFilter(e.target.value || undefined)
        }
        if (e.keyCode === 8 && e.target.value === '') {
          setFilter(undefined)
        }
      }}
      placeholder={('Filter(Press Enter)')}
    />
  )
}

TextColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
}

export default TextColumnFilter
