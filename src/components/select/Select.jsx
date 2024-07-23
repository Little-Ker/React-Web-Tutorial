import React from 'react'
import BaseSelect from './sub/baseSelect'

function Select(props) {
  return (
    <div className="select">
      <BaseSelect {...props} />
    </div>
  )
}

export default Select
