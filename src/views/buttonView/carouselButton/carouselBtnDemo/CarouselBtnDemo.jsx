import React, {
  useCallback, useState
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Arrow from '@/components/svg/arrow'
import styles from './carouselBtnDemo.module.sass'

function CarouselBtnDemo(props) {
  const {
    inputText,
  } = props

  const [runCount] = useState(3)

  const carouselTextList = useCallback(isBottom => (
    <div className={clsx(styles.textList, isBottom && styles.bottomText)}>
      {[...Array(runCount).keys()].map((cur, index) => (
        <div
          key={cur}
          className={clsx(
            styles.runText,
            isBottom ? styles[`bottomRun${index + 1}`] : styles[`run${index + 1}`]
          )}
        >
          <span>{inputText}</span>
          <Arrow
            className={styles.icon}
            strokeColor={styles.iconColor}
          />
        </div>
      ))}
    </div>
  ), [inputText, runCount])

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <p className={styles.title}>{'default'}</p>
        <button type="button" className={styles.button}>
          {carouselTextList(false)}
          {carouselTextList(true)}
        </button>
      </div>
      <div className={styles.display}>
        <p className={styles.title}>{'hover'}</p>
        <button type="button" className={clsx(styles.button, styles.btnHover)}>
          {carouselTextList(false)}
          {carouselTextList(true)}
        </button>
      </div>
    </div>
  )
}

CarouselBtnDemo.propTypes = {
  inputText: PropTypes.string,
}

CarouselBtnDemo.defaultProps = {
  inputText: '',
}

export default CarouselBtnDemo
