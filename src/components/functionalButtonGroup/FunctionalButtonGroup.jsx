import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'
import styles from './functionalButtonGroup.module.sass'

function FunctionalButtonGroup(props) {
  const { onClear, onSubmit, customizeButtons } = props

  return (
    <div className={styles.root}>
      <Grid container>
        <Grid className={styles.buttons} item container>
          <Grid item>
            {!customizeButtons && (
              <ButtonGroup
                className={styles.btnGroup}
                disableElevation
                variant="contained"
              >
                <Button
                  className={styles.lightBtn}
                  onClick={onClear}
                  size="medium"
                >
                  {('Clear')}
                </Button>
                <Button
                  className={styles.darkBtn}
                  onClick={onSubmit}
                  size="medium"
                >
                  {('Search')}
                </Button>
              </ButtonGroup>
            )}
            {customizeButtons && (
              <ButtonGroup
                className={styles.btnGroup}
                size="medium"
                disableElevation
                variant="contained"
              >
                {customizeButtons.map(btn => (
                  <Button
                    key={uuid()}
                    className={clsx(
                      btn.darkBtn ? styles.darkBtn : styles.lightBtn,
                      btn.isDisabled && styles.closeBtn
                    )}
                    onClick={btn.handleClick}
                    disabled={btn.isDisabled}
                  >
                    {btn.text}
                  </Button>
                ))}
              </ButtonGroup>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

FunctionalButtonGroup.propTypes = {
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  customizeButtons: PropTypes.arrayOf(PropTypes.object),
}

FunctionalButtonGroup.defaultProps = {
  onClear: () => {},
  onSubmit: () => {},
  customizeButtons: null,
}

export default FunctionalButtonGroup
