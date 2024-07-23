import React from 'react'
import Input from './sub/input'

function NumberInput(props) {
  return (
    <div className="numberInput">
      <Input {...props} />
    </div>
  )
}

export default NumberInput
