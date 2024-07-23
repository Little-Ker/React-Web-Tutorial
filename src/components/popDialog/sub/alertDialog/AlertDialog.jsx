import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import useDialogStackContext from '../dialogStackContext'
import styles from './alertDialog.module.sass'

function AlertDialog(props) {
  const {
    id, content, onOpen, onClose,
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
          {('Alert')}
        </DialogTitle>
        <DialogContent
          className={styles.contentBlock}
          dividers
        >
          {content}
        </DialogContent>
        <DialogActions className={styles.actionBlock}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={close}
          >
            {('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

AlertDialog.propTypes = {
  id: PropTypes.string,
  content: PropTypes.node,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}

AlertDialog.defaultProps = {
  content: null,
  id: '',
  onClose: () => {},
  onOpen: () => {},
}

export default React.memo(AlertDialog)
