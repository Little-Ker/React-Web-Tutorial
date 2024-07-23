import React from 'react'
import Input from './sub/input'

function TextInput(props) {
  return (
    <div className="textInput">
      <Input {...props} />
    </div>
  )
}

export default TextInput
