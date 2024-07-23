import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import TextInput from '@/components/textInput'
import CodeResult from '@/components/codeResult'
import TextDemo1 from './sub/text01/textDemo1'
import TextCode1 from './sub/text01/textCode1'

function TextView() {
  const [inputText, setInputText] = useState('123')

  return (
    <div>
      <Typography variant="h1">{'[ 文字樣式 ]'}</Typography>
      <TextInput
        label={'範例文字'}
        value={inputText}
        onChange={setInputText}
        fullWidth
      />
      <CodeResult
        demo={<TextDemo1 inputText={inputText} />}
        code={<TextCode1 />}
      />
    </div>
  )
}

export default TextView
