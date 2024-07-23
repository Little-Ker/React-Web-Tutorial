import React, {
  useRef, useState, useMemo, useCallback
} from 'react'
import vars from '@/globalTheme/variables.module.sass'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

function Input(props) {
  const {
    min, max, onChange, value, autoComplete, errorText,
    showError, customizeButtonsStart, customizeButtonsEnd,
  } = props

  const [showLimitTip, setShowLimitTip] = useState(false)
  const limitTip = useRef('')

  const showTip = useCallback(() => {
    setShowLimitTip(true)
  }, [])

  const hideTip = useCallback(() => {
    setShowLimitTip(false)
  }, [])

  const onChangeHandler = useCallback((val) => {
    if ((typeof min === 'number') && val.length < min) {
      limitTip.current = `${('Cannot less than')}
        ${new Intl.NumberFormat('en-US').format(min)} ${('Characters')}`
      showTip()
    } else if ((typeof max === 'number') && val.length > max) {
      limitTip.current = `${('Cannot greater than')}
        ${new Intl.NumberFormat('en-US').format(max)} ${('Characters')}`
      showTip()
    } else {
      hideTip()
    }

    onChange(val)
  }, [onChange, min, max, showTip, hideTip])

  const uuidForTooltip = useMemo(() => uuid(), [])

  const textProps = useMemo(() => {
    const result = { ...props }
    delete result.showError
    delete result.errorText
    delete result.customizeButtonsEnd
    delete result.customizeButtonsStart
    return result
  }, [props])

  return (
    <div key={uuidForTooltip}>
      <Tooltip
        open={showError !== null ? showError : showLimitTip}
        title={errorText !== null ? errorText : limitTip.current}
        arrow
        placement="bottom"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: vars.clrToolTipError,
            },
          },
          arrow: {
            sx: {
              color: vars.clrToolTipError,
            },
          },
        }}
      >
        <div style={{ display: 'flex' }}>
          { customizeButtonsStart
              && (
              <Box
                sx={{
                  'button:last-of-type': {
                    'borderTopRightRadius': '0',
                    'borderBottomRightRadius': '0',
                  },
                }}
              >
                { customizeButtonsStart }
              </Box>
              )}
          <TextField
            {...textProps}
            value={value}
            onChange={(e) => {
              onChangeHandler(e.target.value)
            }}
            error={showError !== null ? showError : showLimitTip}
            autoComplete={autoComplete}
            InputProps={{
              sx: {
                borderTopLeftRadius: customizeButtonsStart ? '0' : '',
                borderBottomLeftRadius: customizeButtonsStart ? '0' : '',
                borderTopRightRadius: customizeButtonsEnd ? '0' : '',
                borderBottomRightRadius: customizeButtonsEnd ? '0' : '',
              },
            }}
          />
          { customizeButtonsEnd
              && (
              <Box
                sx={{
                  'button:first-of-type': {
                    'borderTopLeftRadius': '0',
                    'borderBottomLeftRadius': '0',
                  },
                }}
              >
                { customizeButtonsEnd }
              </Box>
              )}
        </div>

      </Tooltip>
    </div>
  )
}

Input.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  errorText: PropTypes.string,
  showError: PropTypes.bool,
  customizeButtonsStart: PropTypes.element,
  customizeButtonsEnd: PropTypes.element,
}

Input.defaultProps = {
  min: null,
  max: null,
  value: '',
  autoComplete: 'off',
  onChange: () => {},
  errorText: null,
  showError: null,
  customizeButtonsStart: null,
  customizeButtonsEnd: null,
}

export default Input
