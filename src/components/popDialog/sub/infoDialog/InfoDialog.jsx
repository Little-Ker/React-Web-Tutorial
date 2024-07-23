import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'
import useDialogStackContext from '../dialogStackContext'
import styles from './infoDialog.module.sass'

function InfoDialog(props) {
  const {
    id, title, content, onOpen, onClose,
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
        onBackdropClick={close}
        maxWidth="xl"
      >
        <DialogTitle className={styles.titleBlock}>
          {title}
          <Box
            className={styles.closeButton}
            position="absolute"
            onClick={close}
          >
            <IconButton>
              <Close />
            </IconButton>
          </Box>
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
            onClick={() => {
              if (onClose) {
                onClose()
              }
              close()
            }}
          >
            {('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

InfoDialog.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  id: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
}

InfoDialog.defaultProps = {
  title: null,
  content: null,
  id: '',
  onClose: () => {},
  onOpen: () => {},
}

export default React.memo(InfoDialog)
