import React from 'react'
import PropTypes from 'prop-types'
import styles from './textDemo1.module.sass'

function Text01(props) {
  const {
    inputText,
  } = props

  return (
    <div className={styles.root}>
      <span className={styles.textStroke} data-txt={inputText}>
        {inputText}
      </span>
    </div>
  )
}

Text01.propTypes = {
  inputText: PropTypes.string,
}

Text01.defaultProps = {
  inputText: '',
}

export default Text01
