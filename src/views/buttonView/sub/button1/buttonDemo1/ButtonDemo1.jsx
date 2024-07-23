import React from 'react'
import PropTypes from 'prop-types'
import { ArrowForward } from '@mui/icons-material'
import clsx from 'clsx'
import styles from './buttonDemo1.module.sass'

function ButtonDemo1(props) {
  const {
    inputText,
  } = props

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <p className={styles.title}>{'default'}</p>
        <div className={styles.btnBg}>
          <div className={styles.btn}>
            <p>{inputText}</p>
            <p className={styles.btnIcon}><ArrowForward fontSize={'small'} /></p>
          </div>
        </div>
      </div>
      <div className={styles.display}>
        <p className={styles.title}>{'hover'}</p>
        <div className={styles.btnBg}>
          <div className={clsx(styles.btn, styles.btnHover)}>
            <p>{inputText}</p>
            <p className={styles.btnIcon}><ArrowForward fontSize={'small'} /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

ButtonDemo1.propTypes = {
  inputText: PropTypes.string,
}

ButtonDemo1.defaultProps = {
  inputText: '',
}

export default ButtonDemo1
