import React, {
  useRef, useState, useEffect, useMemo, useCallback
} from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import vrbs from '@/globalTheme/variables.module.sass'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import NumberFormat from 'react-number-format'
import { v4 as uuid } from 'uuid'
import { debounce } from 'lodash'
import styles from './input.module.sass'

function Input(props) {
  const {
    label,
    value, onChangeHandler,
    min, max,
    decimalScale,
    // fixedDecimalScale,
    // thousandSeparator,
    // 會遇到中文輸入法 trigger insertCompositionText 的問題, 先不使用
    disabled,
    canBeNull,
    placeholder,
    customStyle,
    delay,
    isBigInt,
    onBlur,
  } = props

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [showLimitTip, setShowLimitTip] = useState(false)
  const limitTip = useRef('')
  const timeout = useRef(null)

  const defaultTheme = useTheme()

  const countdownToHideTip = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setShowLimitTip(false)
    }, 3000)
  }, [])

  const showTip = useCallback(() => {
    setShowLimitTip(true)
    countdownToHideTip()
  }, [countdownToHideTip])

  const hideTip = useCallback(() => {
    setShowLimitTip(false)
    clearTimeout(timeout.current)
  }, [])

  // const checkLimit = useCallback(({ value, floatValue })=>{
  //   if ( value !== null ) {
  //     if ( !((typeof min === 'number') && floatValue < min) &&
  //       !((typeof max === 'number') && floatValue > max) ) {
  //       // 數值正常的時候 hideTip
  //       hideTip()
  //     }
  //     return true
  //   }
  // }, [max, min, hideTip])

  const onChange = useMemo(() => {
    let delayTime = 500
    if (delay !== null) {
      delayTime = delay
    } else if (min <= 1) {
      delayTime = 0
    } else {
      delayTime = 500
    }
    return debounce(({ formattedValue, curValue, floatValue }) => {
      const minIsNumber = typeof min === 'number' || typeof min === 'bigint'
      const maxIsNumber = typeof max === 'number' || typeof max === 'bigint'
      if (curValue !== null) {
        if (((typeof min === 'number') && floatValue < min)
            || (isBigInt && minIsNumber && BigInt(curValue) < BigInt(min))) {
          limitTip.current = `${('Cannot less than min')}
          ${new Intl.NumberFormat('en-US').format(min)}`
          onChangeHandler(isBigInt ? BigInt(min) : min)
          hideTip()
          showTip()
        } else if (((typeof max === 'number') && floatValue > max)
            || (isBigInt && maxIsNumber && BigInt(curValue) > BigInt(max))) {
          limitTip.current = `${('Cannot greater than max')}
          ${new Intl.NumberFormat('en-US').format(max)}`
          onChangeHandler(isBigInt ? BigInt(max) : max)
          hideTip()
          showTip()
        } else if (canBeNull && formattedValue === '') {
          // 若可為空值且當前無輸入便將其設定為 null
          onChangeHandler(null)
        } else if (formattedValue === '') {
          // 若使用者刪除所有內容
          onChangeHandler(isBigInt ? isBigInt(min || 0) : (min || 0))
          forceUpdate()
        } else {
          const newValue = Number(curValue)
          if (Number.isNaN(newValue)) {
            onChangeHandler(isBigInt ? isBigInt(min || 0) : (min || 0))
          } else if (typeof onChangeHandler === 'function') {
            onChangeHandler(isBigInt ? BigInt(curValue) : Number(newValue))
          }
        }
      }
    }, delayTime)
  }, [delay, min, max, , onChangeHandler,
    hideTip, showTip, canBeNull, forceUpdate, isBigInt])

  useEffect(() => () => clearTimeout(timeout.current), [])

  const uuidForTooltip = useMemo(() => uuid(), [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Tooltip
        className={styles.tooltip}
        open={showLimitTip}
        title={limitTip.current}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: vrbs.clrToolTipError,
            },
          },
          arrow: {
            sx: {
              color: vrbs.clrToolTipError,
            },
          },
        }}
      >
        <div key={uuidForTooltip} className={styles.root}>
          <NumberFormat
            value={(canBeNull && value === null) ? ''
              : isBigInt ? value.toString() : value}
            className={styles.numberFormat}
            thousandSeparator={false}
            decimalScale={decimalScale}
            fixedDecimalScale={false}
            disabled={disabled}
            label={label}
            onValueChange={onChange}
            customInput={TextField}
            autoComplete="off"
            // isAllowed={checkLimit}
            placeholder={placeholder}
            sx={customStyle}
            onBlur={onBlur}
          />
        </div>
      </Tooltip>
    </ThemeProvider>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bigint]),
  onChangeHandler: PropTypes.func,
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bigint]),
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bigint]),
  decimalScale: PropTypes.number,
  // fixedDecimalScale: PropTypes.bool,
  // thousandSeparator: PropTypes.bool,
  disabled: PropTypes.bool,
  canBeNull: PropTypes.bool,
  placeholder: PropTypes.string,
  delay: PropTypes.number,
  isBigInt: PropTypes.bool,
  onBlur: PropTypes.func,
  customStyle: PropTypes.object,
}

Input.defaultProps = {
  label: '',
  value: 0,
  onChangeHandler: () => {},
  min: 0,
  max: null,
  decimalScale: 0,
  // thousandSeparator: false,
  // fixedDecimalScale: false,
  disabled: false,
  canBeNull: false,
  placeholder: '',
  delay: null,
  isBigInt: false,
  onBlur: () => {},
  customStyle: {},
}

export default Input
