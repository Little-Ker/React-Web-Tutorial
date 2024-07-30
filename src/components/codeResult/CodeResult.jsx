import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton, Collapse, Tooltip
} from '@mui/material'
import {
  Code, CodeOff
} from '@mui/icons-material'
import styles from './codeResult.module.sass'

function CodeResult(props) {
  const { demo, code, name } = props

  const [isShowCode, setIsShowCode] = useState(false)

  return (
    <div className={styles.codeResult}>
      <div className={styles.codeBorder}>
        <p className={styles.resultTitle}>{`DEMO - ${name}`}</p>
        <div className={styles.result}>
          {demo}
        </div>
        <div className={styles.footer}>
          <Tooltip title={(isShowCode) ? '關閉程式碼' : '顯示程式碼'}>
            <IconButton onClick={() => setIsShowCode(!isShowCode)}>
              {(isShowCode) ? <CodeOff /> : <Code />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Collapse in={isShowCode}>
        {code}
      </Collapse>
    </div>
  )
}

CodeResult.propTypes = {
  demo: PropTypes.node,
  code: PropTypes.node,
  name: PropTypes.string,
}

CodeResult.defaultProps = {
  demo: null,
  code: null,
  name: '',
}

export default CodeResult
