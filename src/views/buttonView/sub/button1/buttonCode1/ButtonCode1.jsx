import React from 'react'
import CodeHighlight from '@/components/codeHighlight'

function ButtonCode1() {
  const codeHtml = `
    <div className={styles.btnBg}>
      <div className={styles.btn}>
        <p className={styles.btnText}>{inputText}</p>
        <p className={styles.btnIcon}><ArrowForward fontSize={'small'} /></p>
      </div>
    </div>
  `

  const codeSass = `
      .btnBg
        position: relative
        width: 105px
        height: 95px
        border-radius: 1.5rem
        border: 1px solid #464646
        background: linear-gradient( 13deg , #59d5f6 0%, #fff79a 100%)
        cursor: pointer
        .btn
          width: calc(100% + 2px)
          height: calc(100% + 2px)
          background: #fff
          border-radius: 1.5rem
          border: 1px solid #464646
          font-weight: bold
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          position: absolute
          top: -7px
          left: -7px
          transition: all .3s
          overflow: hidden
          &:hover, &.btnHover
            top: -1px
            left: -1px
        .btnIcon
          position: absolute
          right: 0
          bottom: 0
          width: 33.33%
          height: 33.33%
          border-top: 1px solid #464646
          border-left: 1px solid #464646
          border-radius: 1rem 0 0 0
          background-color: #fff79a
          padding: .4rem
  `

  return (
    <div>
      <CodeHighlight
        code={codeHtml}
        type={'htmlbars'}
        fileName={'text.html'}
      />
      <CodeHighlight
        code={codeSass}
        type={'scss'}
        fileName={'text.sass'}
      />
    </div>
  )
}

export default ButtonCode1
