import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {
  ThemeProvider,
  createTheme,
  useTheme
} from '@mui/material/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
import styles from './formDialog.module.sass'

function FormDialog(props) {
  const {
    id, title, content, onOpen,
    onClose, disableEnforceFocus, customStyle,
  } = props

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
        disableEnforceFocus={disableEnforceFocus}
        sx={{ ...customStyle?.root }}
      >
        <DialogTitle
          className={styles.titleBlock}
          sx={{ ...customStyle?.title }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          className={styles.contentBlock}
          dividers
          sx={{ ...customStyle?.content }}
        >
          {content}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

FormDialog.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  id: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  disableEnforceFocus: PropTypes.bool,
  customStyle: PropTypes.object,
}

FormDialog.defaultProps = {
  title: null,
  content: null,
  id: '',
  onClose: () => {},
  onOpen: () => {},
  disableEnforceFocus: false,
  customStyle: null,
}

export default React.memo(FormDialog)
