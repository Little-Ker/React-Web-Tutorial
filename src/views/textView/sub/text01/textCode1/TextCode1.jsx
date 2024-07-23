import React from 'react'
import CodeHighlight from '@/components/codeHighlight'

function TextCode1() {
  const codeHtml = `
    <span className={styles.textStroke} data-txt={inputText}>
      {inputText}
    </span>
  `

  const codeSass = `
    .textStroke
      position: relative
      font-size: 5rem
      -webkit-text-stroke: .5px #4bb2f8
      color: #fff79a
      font-weight: 800
      font-family: "Chakra Petch", sans-serif
      letter-spacing: .5rem
      &::before
        content: attr(data-txt)
        position: absolute
        left: -.3rem
        top: -.8rem
        -webkit-text-stroke: .5px #4bb2f8
        color: #ffffff
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

export default TextCode1
