import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TextInput from '@/components/textInput'
import CodeResult from '@/components/codeResult'
import ButtonDemo1 from './sub/button1/buttonDemo1'
import ButtonCode1 from './sub/button1/buttonCode1'
import ButtonDemo2 from './sub/button2/buttonDemo2'
import ButtonCode2 from './sub/button2/buttonCode2'

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
      <CodeResult
        demo={<ButtonDemo2 inputText={inputText} />}
        code={<ButtonCode2 />}
      />
    </div>
  )
}

export default TextView
