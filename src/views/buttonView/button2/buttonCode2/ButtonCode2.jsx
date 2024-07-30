import React from 'react'
import CodeHighlight from '@/components/codeHighlight'

function ButtonCode1() {
  const codeHtml = `
    import React, { useRef } from 'react'
    import catTail from '@public/images/demo/button/cat_tail.gif'
    import catBtn from '@public/images/demo/button/cat_btn.png'
    import { gsap } from 'gsap'
    import styles from './catButton.module.sass'

    function CatButton() {
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
      )
    }
  `

  const codeSass = `
      .btnBg
        position: relative
        width: 250px
        min-height: 60px
        color: #fad183
        background: #1e6a6e
        border-radius: 100px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px
        margin-top: 5rem
        .btnText
          font-weight: bold
          &::before
            content: attr(data-txt)
            font-size: 13px
            background: #fad183
            color: #1e6a6e
            border-radius: 1rem
            padding: .1rem .5rem
            margin-right: .5rem
        .btnIcon
          position: absolute
          right: 30px
          width: 6px
          height: 12px
          &::before, &::after
            content: ''
            width: 6px
            height: 12px
            border-radius: 0 100% 100% 0/50%
            border: 2px solid #99BBBD
            border-left: none
            position: absolute
            transition: .2s all
          &::before
            transform: translateX(-15px)
            opacity: 0
        .catTail
          width: 90px
          height: 90px
          position: absolute
          top: -33px
          right: -63px
          z-index: -1
          transition: .2s all
        .catBody
          width: 90px
          position: absolute
          z-index: -1
          bottom: 30px
          opacity: 0
        &:hover
          .btnIcon::after
            opacity: 0
            transform: translateX(15px)
          .btnIcon::before
            opacity: 1
            transform: translateX(0)
  `

  return (
    <div>
      <CodeHighlight
        code={codeHtml}
        type={'jsx'}
        fileName={'catButton.jsx'}
      />
      <CodeHighlight
        code={codeSass}
        type={'scss'}
        fileName={'catButton.sass'}
      />
    </div>
  )
}

export default ButtonCode1
