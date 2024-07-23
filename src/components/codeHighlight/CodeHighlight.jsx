import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styles from './codeHighlight.module.sass'

function CodeHighlight(props) {
  const {
    code, type, fileName,
  } = props

  return (
    <div className={styles.root}>
      <div className={styles.label}>{fileName}</div>
      <SyntaxHighlighter
        language={type}
        style={tomorrowNight}
        wrapLines
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

CodeHighlight.propTypes = {
  code: PropTypes.node,
  type: PropTypes.string,
  fileName: PropTypes.string,
}

CodeHighlight.defaultProps = {
  code: null,
  type: '',
  fileName: '',
}

export default CodeHighlight
