import React, {
  useState, useEffect
} from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import TextInput from '@/components/textInput'
import CodeResult from '@/components/codeResult'
import routes from '@/router/routes'

function TemplateView() {
  const location = useLocation()
  const [inputText, setInputText] = useState('TEST')

  const [viewData, setViewData] = useState({})

  useEffect(() => {
    const findPath = routes?.find(route => location?.pathname === `${route?.path}`)
    setViewData(findPath)
  }, [location])

  return (
    <div>
      <Typography variant="h1">{`[ ${viewData?.name} ]`}</Typography>
      <TextInput
        label={'範例文字'}
        value={inputText}
        onChange={setInputText}
        fullWidth
      />
      {viewData?.childComponents?.map(cur => (
        <CodeResult
          demo={<cur.demo inputText={inputText} />}
          code={<cur.code />}
          name={cur.name}
          key={cur.id}
        />
      ))}
    </div>
  )
}

export default TemplateView
