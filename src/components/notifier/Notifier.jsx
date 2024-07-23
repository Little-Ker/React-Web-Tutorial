import React, { useEffect, useCallback, useRef } from 'react'
import { Button } from '@mui/material'
import {
  Close as CloseIcon,
  FileCopy as FileCopyIcon
} from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import noticeStack from '@/zustand/noticeStack'
import styles from './notifier.module.sass'

export const snackbarClasses = {
  variantSuccess: styles.snackbarSuccess,
  variantError: styles.snackbarError,
  variantWarning: styles.snackbarWarning,
  variantInfo: styles.snackbarInfo,
}

function Notifier() {
  const { notifications, removeSnackbar } = noticeStack()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const displayedRef = useRef([])
  const storeDisplayed = useCallback((id) => {
    displayedRef.current = [...displayedRef.current, id]
  }, [])

  const removeDisplayed = useCallback((id) => {
    displayedRef.current = [...displayedRef.current.filter(key => id !== key)]
  }, [])

  useEffect(() => {
    notifications?.forEach(({
      key, message, detail, options = {}, dismissed = false,
    }) => {
      if (dismissed) {
        closeSnackbar(key)
        return
      }
      const curOption = {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
        action: id => (
          <>
            {(detail)
              && (
                <CopyToClipboard
                  text={detail}
                >
                  <Button
                    className={styles.actionBtn}
                    color="inherit"
                    size="small"
                    title={('Copy detail message')}
                  >
                    <FileCopyIcon />
                  </Button>
                </CopyToClipboard>
              )}
            <Button
              className={styles.actionBtn}
              color="inherit"
              size="small"
              onClick={() => closeSnackbar(id)}
            >
              <CloseIcon />
            </Button>
          </>
        ),
        autoHideDuration: 5000,
        ...options,
      }

      if (displayedRef.current.includes(key)) return

      enqueueSnackbar(message, {
        key,
        ...curOption,
        onClose: (event, reason, myKey) => {
          if (curOption.onClose) {
            curOption.onClose(event, reason, myKey)
          }
        },
        onExited: (event, myKey) => {
          removeSnackbar(myKey)
          removeDisplayed(myKey)
        },
        preventDuplicate: true,
      })

      storeDisplayed(key)
    })
  }, [closeSnackbar, enqueueSnackbar, notifications, removeDisplayed, removeSnackbar,
    storeDisplayed])

  return null
}

export default Notifier
