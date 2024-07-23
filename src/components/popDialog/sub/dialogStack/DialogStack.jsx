import React from 'react'
import useDialogStackContext from '../dialogStackContext'
import AlertDialog from '../alertDialog'
import ConfirmDialog from '../confirmDialog'
import FormDialog from '../formDialog'
import InfoDialog from '../infoDialog'
import styles from './dialogStack.module.sass'

function DialogStack() {
  const { popDialogs } = useDialogStackContext()

  return (
    <div className={styles.root}>
      {popDialogs?.map((curProps) => {
        switch (curProps.type) {
          case 'ALERT':
            return (
              <AlertDialog
                key={curProps.id}
                {...curProps}
              />
            )
          case 'CONFIRM':
            return (
              <ConfirmDialog
                key={curProps.id}
                {...curProps}
              />
            )
          case 'FORM':
            return (
              <FormDialog
                key={curProps.id}
                {...curProps}
              />
            )
          case 'INFO':
            return (
              <InfoDialog
                key={curProps.id}
                {...curProps}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default DialogStack
