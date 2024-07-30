import React from 'react'
import {
  Home, TextFields, ArrowCircleRight
} from '@mui/icons-material'

const routes = [
  { // 首頁
    id: 'index',
    path: '/index',
    exact: true, // 嚴格匹配路徑
    component: React.lazy(() => import('@/views/home')),
    icon: <Home />,
    name: 'Home',
    visible: true,
  },
  { // 文字樣式
    id: 'text',
    path: '/text',
    exact: true,
    component: React.lazy(() => import('@/views/templateView')),
    icon: <TextFields />,
    name: '文字樣式',
    visible: true,
    childComponents: [{
      id: 'text1',
      demo: React.lazy(() => import('@/views/textView/text01/textDemo1')),
      code: React.lazy(() => import('@/views/textView/text01/textCode1')),
      name: '文字 1',
    }],
  },
  { // 按鈕樣式
    id: 'button',
    path: '/button',
    exact: true,
    component: React.lazy(() => import('@/views/templateView')),
    icon: <ArrowCircleRight />,
    name: '按鈕樣式',
    visible: true,
    childComponents: [{
      id: 'button1',
      demo: React.lazy(() => import('@/views/buttonView/button1/buttonDemo1')),
      code: React.lazy(() => import('@/views/buttonView/button1/buttonCode1')),
      name: '矩形按鈕',
    }, {
      id: 'button2',
      demo: React.lazy(() => import('@/views/buttonView/button2/buttonDemo2')),
      code: React.lazy(() => import('@/views/buttonView/button2/buttonCode2')),
      name: '貓咪按鈕',
    }, {
      id: 'carouselButton',
      demo: React.lazy(() => import('@/views/buttonView/carouselButton/carouselBtnDemo')),
      code: React.lazy(() => import('@/views/buttonView/carouselButton/carouselBtnCode')),
      name: '輪播按鈕',
    }],
  },
]
export default routes
