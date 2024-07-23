import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import ButtonGroup from '@mui/material/ButtonGroup'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import useDialogStackContext from '../dialogStackContext'
import styles from './confirmDialog.module.sass'

function ConfirmDialog(props) {
  const {
    id, content,
    onConfirm, onCancel,
    onOpen, onClose,
  } = props
  const { closeDialog } = useDialogStackContext()

  /* 使用當前 theme 加入模組特有 theme */
  const envTheme = useTheme()

  const moduleTheme = {
    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            background: envTheme.palette.secondary.dark,
            color: envTheme.palette.secondary.contrastText,
          },
        },
      },
    },
  }

  const close = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose()
    }
    closeDialog(id)
  }, [closeDialog, id, onClose])

  const handleConfirm = useCallback(() => {
    if (typeof onConfirm === 'function') {
      onConfirm()
    }
    close()
  }, [onConfirm, close])

  const handleCancel = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel()
    }
    close()
  }, [onCancel, close])

  useEffect(() => {
    if (typeof onOpen === 'function') {
      onOpen()
    }
  }, [onOpen, id])

  return (
    <ThemeProvider theme={theme => createTheme(theme, moduleTheme)}>
      <Dialog
        className={styles.root}
        open
        onClose={onClose}
        maxWidth="xl"
      >
        <DialogTitle className={styles.titleBlock}>
          {('Confirm')}
        </DialogTitle>
        <DialogContent
          className={styles.contentBlock}
          dividers
        >
          {content}
        </DialogContent>
        <DialogActions className={styles.actionBlock}>
          <ButtonGroup disableElevation>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCancel}
            >
              {('Cancel')}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleConfirm}
            >
              {('OK')}
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

ConfirmDialog.propTypes = {
  content: PropTypes.node,
  id: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
}

ConfirmDialog.defaultProps = {
  content: null,
  id: '',
  onConfirm: () => {},
  onCancel: () => {},
  onClose: () => {},
  onOpen: () => {},
}

export default React.memo(ConfirmDialog)
