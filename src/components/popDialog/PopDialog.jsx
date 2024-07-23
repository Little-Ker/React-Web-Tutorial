import React from 'react'
import DialogStack from './sub/dialogStack'

function PopDialog(props) {
  return (
    <div className="popDialog">
      <DialogStack {...props} />
    </div>
  )
}

export default PopDialog
