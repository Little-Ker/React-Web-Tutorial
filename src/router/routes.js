import React from 'react'
import {
  Home, TextFields, ArrowCircleRight
} from '@mui/icons-material'

const routes = [
  { // 首頁（基本數據）
    id: 'index', // 對應後端頁面權限 id
    path: '/index', // router 顯示的 url path
    exact: true, // 是否為嚴格匹配路徑
    component: React.lazy(() => import('@/views/home')), // 對應顯示的元件 // 非初始或常用頁面可 Lazy import
    icon: <Home />, // 選單上的 icon
    name: 'Home', // 選單顯示的名稱, 對應語系檔的 key
    visible: true, // 是否顯示在選單上
    enable: true, // 是否在前端啟用
    isDev: true,
  },
  { // 文字樣式
    id: 'text', // 對應後端頁面權限 id
    path: '/text', // router 顯示的 url path
    exact: true, // 是否為嚴格匹配路徑
    component: React.lazy(() => import('@/views/templateView')), // 對應顯示的元件 // 非初始或常用頁面可 Lazy import
    icon: <TextFields />, // 選單上的 icon
    name: '文字樣式', // 選單顯示的名稱, 對應語系檔的 key
    visible: true, // 是否顯示在選單上
    enable: true, // 是否在前端啟用
    isDev: true,
    childComponents: [{
      id: 'text1',
      demo: React.lazy(() => import('@/views/textView/text01/textDemo1')),
      code: React.lazy(() => import('@/views/textView/text01/textCode1')),
      name: '文字 1',
    }],
  },
  { // 按鈕樣式
    id: 'button', // 對應後端頁面權限 id
    path: '/button', // router 顯示的 url path
    exact: true, // 是否為嚴格匹配路徑
    component: React.lazy(() => import('@/views/templateView')), // 對應顯示的元件 // 非初始或常用頁面可 Lazy import
    icon: <ArrowCircleRight />, // 選單上的 icon
    name: '按鈕樣式', // 選單顯示的名稱, 對應語系檔的 key
    visible: true, // 是否顯示在選單上
    enable: true, // 是否在前端啟用
    isDev: true,
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
    }],
  },
]
export default routes
