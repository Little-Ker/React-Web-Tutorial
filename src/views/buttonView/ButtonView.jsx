import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TextInput from '@/components/textInput'
import CodeResult from '@/components/codeResult'
import ButtonDemo1 from './sub/button1/buttonDemo1'
import ButtonCode1 from './sub/button1/buttonCode1'

function TextView() {
  const [inputText, setInputText] = useState('TEST')

  return (
    <div>
      <Typography variant="h1">{'[ 按鈕樣式 ]'}</Typography>
      <TextInput
        label={'範例文字'}
        value={inputText}
        onChange={setInputText}
        fullWidth
      />
      <CodeResult
        demo={<ButtonDemo1 inputText={inputText} />}
        code={<ButtonCode1 />}
      />
    </div>
  )
}

export default TextView
