import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import catTail from '@public/images/demo/button/cat_tail.gif'
import catBtn from '@public/images/demo/button/cat_btn.png'
import { gsap } from 'gsap'
import styles from './buttonDemo2.module.sass'

function ButtonDemo1(props) {
  const {
    inputText,
  } = props

  const catTailRef = useRef(null)
  const catBodyRef = useRef(null)

  const handleMouseEnter = () => {
    let tl = gsap.timeline()
    tl.to(catTailRef.current, {
      right: -50,
      opacity: 0,
      duration: 0.1,
    }).to(catBodyRef.current, {
      bottom: 50,
      opacity: 1,
      duration: 0.2,
      onComplete: () => {
        tl.kill()
        tl = null
      },
    })
  }

  const handleMouseLeave = () => {
    let tl = gsap.timeline()
    tl.to(catBodyRef.current, {
      bottom: 30,
      opacity: 0,
      duration: 0.2,
    }).to(catTailRef.current, {
      right: -63,
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        tl.kill()
        tl = null
      },
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <p className={styles.title}>{'default'}</p>
        <div
          className={styles.btnBg}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className={styles.btnText} data-txt={'標籤'}>{inputText}</p>
          <div className={styles.btnIcon} />
          <img ref={catTailRef} className={styles.catTail} src={catTail} alt="" />
          <img ref={catBodyRef} className={styles.catBody} src={catBtn} alt="" />
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
