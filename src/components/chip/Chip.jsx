import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './chip.module.sass'

function Chip(props) {
  const { id, label, errLabel } = props

  return (
    <div className={styles.chip}>
      {id && (
        <div className={clsx(styles.chip__label, (errLabel && styles.chip__errLabel))}>
          {id}
        </div>
      )}
      <div>
        {label}
      </div>
    </div>
  )
}

Chip.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  errLabel: PropTypes.bool,
}

Chip.defaultProps = {
  id: '',
  label: '',
  errLabel: false,
}

export default Chip
