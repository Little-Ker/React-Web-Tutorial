import React, {
  useRef, useCallback
} from 'react'
import { Close } from '@mui/icons-material'
import { Typography, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import styles from './tagsInput.module.sass'

function TagsInput(props) {
  const { label, value, onChange } = props
  const tagRef = useRef()

  const handleDelete = useCallback((str) => {
    const tagArr = value.filter(val => val !== str)
    onChange(tagArr)
  }, [onChange, value])

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault()
    const tagValue = tagRef.current.value.trim()
    if (tagValue === '') return
    const tagArr = tagValue.split(';')
    const result = tagArr.filter(element => value.indexOf(element) === -1)
    onChange([...value, ...result])
    tagRef.current.value = ''
  }, [onChange, value])

  return (
    <div className={styles.root}>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.tagsList}>
          {value.map((data, index) => (
            <div key={data} className={styles.tag}>
              <Typography className={styles.tagText}>{data}</Typography>
              <Close
                className={styles.tagCross}
                onClick={() => {
                  handleDelete(data)
                }}
              />
            </div>
          ))}
        </div>
        <TextField
          label={label}
          inputRef={tagRef}
          fullWidth
          onBlur={handleOnSubmit}
          autoComplete="off"
          inputProps={{ maxLength: 200 }}
        />
      </form>
    </div>
  )
}

TagsInput.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

TagsInput.defaultProps = {
  value: [],
  onChange: () => {},
  label: '',
}

export default TagsInput
