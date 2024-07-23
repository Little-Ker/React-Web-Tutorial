import React, {
  useMemo, useCallback, useState, useRef, useEffect
} from 'react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, alpha } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { FixedSizeList as List } from 'react-window'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import styles from './select.module.sass'

function BaseSelect(props) {
  const {
    label,
    value,
    setValue,
    defaultOptionID,
    options,
    placeholder,
    readonly,
    search,
    enableOptionAll,
    optionAll,
    multiple,
    multiComposing,
    onChangeHandler,
  } = props

  const [searchText, setSearchText] = useState('')
  const [optionListOpen, setOptionListOpen] = useState(false)
  const isTyping = useRef(false) // 修正中文注音輸入觸發 onChange 的問題
  const isIDTypeOfNumber = useMemo(
    () => typeof options?.[0]?.id === 'number',
    [options]
  )

  const theme = useTheme()

  const optionList = useMemo(() => {
    if (enableOptionAll) {
      const optionAllData = {
        id: optionAll?.id !== undefined
          ? optionAll.id : (isIDTypeOfNumber ? -1 : 'All'),
        // eslint-disable-next-line react/prop-types
        keyword: optionAll?.keyword !== undefined
          // eslint-disable-next-line react/prop-types
          ? optionAll.keyword : undefined,
        label: optionAll?.label !== undefined
          ? optionAll.label : ('All'),
      }
      const newList = options?.slice(0)
      newList.unshift(optionAllData)
      return newList
    }
    return options
  }, [enableOptionAll, isIDTypeOfNumber,
    optionAll, options])

  const selectProps = useMemo(() => ({
    SelectProps: {
      multiple,
      open: optionListOpen,
      displayEmpty: true,
      MenuProps: { autoFocus: false },
      value: multiple ? [] : '',
      defaultValue: multiple ? [] : '',
      renderValue: () => {
        if (!value) {
          return (
            <span className={styles.placeholder}>
              {placeholder || ('Please select')}
            </span>
          )
        }
        if (multiple) {
          const list = value.map(el => el?.label)
          const isHTML = typeof list[0] === 'object'

          return (
            <div style={{
              textOverflow: 'ellipsis',
              whiteSpace: multiComposing === 'ellipsis'
                ? 'nowrap' : 'break-spaces',
              overflow: 'hidden',
              paddingRight: '20px',
            }}
            >
              { !isHTML && (
              <>
                {list.join(', ')}
              </>
              )}
              { isHTML && list.map((el, index) => {
                const isLast = index === list.length - 1
                return (
                  <div
                    style={{
                      marginRight: '5px',
                      marginBottom: isLast ? '0' : '3px',
                      display: 'inline-block',
                    }}
                    key={uuid()}
                  >
                    {el}
                  </div>
                )
              })}
              { !readonly && (
              <div
                style={{
                  position: 'absolute',
                  right: '35px',
                  top: '50%',
                  transform: 'translate(0, -50%)',
                }}
                className="selectCloseBtn"
              >
                <IconButton
                  onClick={() => {
                    setValue(null)
                    onChangeHandler(null, null)
                  }}
                  edge="end"
                  className="selectCloseBtn"
                >
                  <CloseIcon className="selectCloseBtn" />
                </IconButton>
              </div>
              )}
            </div>
          )
        }
        return optionList?.find(
          cur => String(cur.id) === String(value.id)
        )?.label
      },
      onOpen: () => setSearchText(''),
    },
  }), [multiple, optionListOpen, value, placeholder, , multiComposing, readonly, setValue,
    onChangeHandler, optionList])

  const filteredOptions = useMemo(() => {
    if (search && searchText !== '') {
      return optionList.filter((cur) => {
        const keyword = cur.keyword !== undefined
          ? String(cur.keyword) // 有設定 keyword
          : ( // 沒有設定 keyword
            ['number', 'string'].includes(typeof cur.label) // 看是否有設定 label
              ? cur?.label // 有設定 label
              : String(cur.id) // 沒有設定 label, 就用 id
          )
        return keyword?.toLowerCase()
          ?.indexOf(searchText.toLowerCase()) !== -1
      })
    }
    return optionList
  }, [optionList, search, searchText])

  const multipleSelectHandler = useCallback((curValue) => {
    let optionAllId = null
    if (optionAll) {
      optionAllId = optionAll.id
    } else if (isIDTypeOfNumber) {
      optionAllId = -1
    } else {
      optionAllId = 'All'
    }

    if (enableOptionAll && curValue.id === optionAllId) {
      // 點擊"全選"只保留"全選"選項
      setValue([curValue])
    } else {
      setValue((prev) => {
        let result = prev || []
        // 移除全選
        if (enableOptionAll && result.find(el => el.id === optionAllId)) {
          result = prev.filter(el => el.id !== optionAllId)
        }

        if (result?.find(el => el?.id === curValue.id)) { // 移除已存在的選項
          result = result.filter(el => el.id !== curValue.id)
        } else { // 加入選項
          result.push(curValue)
        }

        if (result.length === 0) {
          return null
        }
        return [...result]
      })
    }
  }, [setValue, isIDTypeOfNumber, optionAll, enableOptionAll])

  const onSelect = useCallback((val) => {
    const curValue = optionList?.find(cur => String(cur.id) === val)
    onChangeHandler(val, curValue)
    if (multiple) {
      multipleSelectHandler(curValue)
    } else {
      setValue(curValue || null)
    }
  }, [onChangeHandler, optionList, multiple, multipleSelectHandler, setValue])

  function Row(rowProps) {
    const { data, index, style } = rowProps
    const option = data[index]
    const handleClick = onSelect.bind(null, String(option.id))
    const handleDisabledClick = (e) => {
      e.stopPropagation()
    }

    let selected = false
    if (multiple && value) {
      if (value.find(el => el?.id === option.id)) {
        selected = true
      }
    }

    const color = alpha(theme.palette.primary.light, 0.2)

    return (
      <MenuItem
        key={uuid()}
        value={String(option.id)}
        style={style}
        onClick={option.disabled ? handleDisabledClick : handleClick}
        sx={{
          color: option.disabled ? '#AAA' : 'inherit',
          cursor: option.disabled ? 'not-allowed' : 'pointer',
          backgroundColor: selected && multiple ? color : '',
        }}
      >
        { option.label }
      </MenuItem>
    )
  }

  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  })

  const itemSize = smUp ? 36 : 48
  const itemCount = useMemo(
    () => filteredOptions?.length,
    [filteredOptions]
  )

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemCount * itemSize
  }

  const handleClickAway = () => {
    setOptionListOpen(false)
  }

  useEffect(() => {
    if (!multiple) {
      setOptionListOpen(false)
    }
  }, [value, multiple])

  useEffect(() => {
    if (enableOptionAll) {
      // 有啟用"全部"選項時將全部設為預設
      setValue(multiple ? [optionList[0]] : optionList[0])
    }
    if (defaultOptionID !== null) {
      // 如果有指定 ID
      if (Array.isArray(defaultOptionID)) {
        const defaultOption = []
        defaultOptionID.forEach((el) => {
          const temp = optionList?.find(cur => cur.id === el)
          if (temp) {
            defaultOption.push(temp)
          }
        })
        setValue(defaultOption)
      } else {
        const defaultOption = optionList?.find(cur => cur.id === defaultOptionID)
        setValue(multiple ? [defaultOption] : defaultOption)
      }
    }
  }, [enableOptionAll, defaultOptionID, setValue, optionList, multiple])

  return (
    <TextField
      select
      fullWidth
      className={styles.root}
      label={label}
      disabled={readonly}
      {...selectProps}
      placeholder={placeholder}
      onClick={(e) => {
        let isCloseBtn = false
        // 判斷是否點擊 closeBtn
        if (e.target.nodeName === 'path'
        && e.target.parentElement.className?.baseVal.includes('selectCloseBtn')) {
          isCloseBtn = true
        }
        if (e.target.nodeName !== 'path'
        && e.target.parentElement.className?.includes('selectCloseBtn')) {
          isCloseBtn = true
        }

        if (!isCloseBtn) {
          setOptionListOpen(true && !readonly)
        }
      }}
    >
      {search && (
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder={('Enter keyword')}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            autoComplete="off"
            onChange={(e) => {
              if (!isTyping.current) {
                setSearchText(e.target.value)
              }
            }}
            onCompositionStart={() => { isTyping.current = true }}
            onCompositionEnd={(e) => {
              isTyping.current = false
              setSearchText(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Escape') {
                e.stopPropagation()
              }
            }}
            onClick={e => e.stopPropagation()}
          />
        </ListSubheader>
      )}
      <div>
        { !multiple && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <List
              height={getHeight()}
              width="100%"
              itemData={filteredOptions}
              itemCount={filteredOptions?.length}
              itemSize={itemSize}
            >
              {Row}
            </List>
          </ClickAwayListener>
        )}
        { multiple && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <List
                height={getHeight()}
                width="100%"
                itemData={filteredOptions}
                itemCount={filteredOptions?.length}
                itemSize={itemSize}
              >
                {Row}
              </List>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </TextField>
  )
}

BaseSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setValue: PropTypes.func,
  defaultOptionID: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.array,
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    })
  ),
  placeholder: PropTypes.string,
  search: PropTypes.bool,
  readonly: PropTypes.bool,
  enableOptionAll: PropTypes.bool,
  optionAll: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
  }),
  multiComposing: PropTypes.string,
  onChangeHandler: PropTypes.func,
  multiple: PropTypes.bool,
}

BaseSelect.defaultProps = {
  label: '',
  value: null,
  setValue: () => {},
  defaultOptionID: null,
  options: [],
  placeholder: null,
  search: false,
  readonly: false,
  enableOptionAll: false,
  optionAll: null,
  multiComposing: 'ellipsis',
  onChangeHandler: () => {},
  multiple: false,
}

export default BaseSelect
