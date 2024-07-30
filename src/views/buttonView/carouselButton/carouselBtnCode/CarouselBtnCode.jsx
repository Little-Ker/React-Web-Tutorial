import React from 'react'
import CodeHighlight from '@/components/codeHighlight'

function CarouselBtnCode() {
  const codeHtml = `
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
                !isBottom && styles[\`run\${index + 1}\`],
                isBottom && styles[\`bottomRun\${index + 1}\`]
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
          <button type="button" className={styles.button}>
            {carouselTextList(false)}
            {carouselTextList(true)}
          </button>
        </div>
      )
    }
  `

  const codeSass = `
    $cBtnBg: #002C83
    $cBtnText: #fff

    .button
      width: 200px
      height: 55px
      border: 1px solid $cBtnBg
      background: $cBtnText
      border-radius: 40px
      padding: .8rem 0
      display: flex
      align-items: center
      font-size: 14px
      color: $cBtnBg
      overflow: hidden
      transition: .3s all
      position: relative
      cursor: pointer
      .textList
        width: 100%
        position: absolute
        transition: .3s all
        transform: translateY(0)
        .runText
          display: flex
          align-items: center
          width: 100%
          white-space: nowrap
          position: absolute
          color: $cBtnBg
          font-weight: bold
          top: 0
          bottom: 0
          animation: marquee 18s linear infinite
          @for $i from 1 through 2
            &.run#{$i}
              animation-delay: -#{$i * 6}s

          @for $i from 1 through 3
            &.bottomRun#{$i}
              animation-delay: -#{($i - 1) * 6 + 1}s
          span
            margin: 0 .3rem
          &.bottomText
            bottom: -30px
      .icon
        width: 1.2rem
        transform: rotate(-45deg)
        margin-top: 5px
        .iconColor
          stroke: $cBtnBg
      &:hover
        background: $cBtnBg
        .textList
          transform: translateY(-55px)
          .iconColor
            stroke: $cBtnText
          .runText
            color: $cBtnText

    @keyframes marquee
      0%
        transform: translateX(-100%)
      100%
        transform: translateX(100%)
  `

  return (
    <div>
      <CodeHighlight
        code={codeHtml}
        type={'jsx'}
        fileName={'carouselBtn.jsx'}
      />
      <CodeHighlight
        code={codeSass}
        type={'scss'}
        fileName={'carouselBtn.sass'}
      />
    </div>
  )
}

export default CarouselBtnCode
