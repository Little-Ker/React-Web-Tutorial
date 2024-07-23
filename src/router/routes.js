import React from 'react'
import { v4 as uuid } from 'uuid'
import { Home, TextFields  } from '@mui/icons-material'

const routes = [
  { // 首頁（基本數據）
    key: uuid(), // 每一個節點都該有自己獨立的 key 值以供辨別
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
    key: uuid(), // 每一個節點都該有自己獨立的 key 值以供辨別
    id: 'text', // 對應後端頁面權限 id
    path: '/text', // router 顯示的 url path
    exact: true, // 是否為嚴格匹配路徑
    component: React.lazy(() => import('@/views/textView')), // 對應顯示的元件 // 非初始或常用頁面可 Lazy import
    icon: <TextFields />, // 選單上的 icon
    name: '文字樣式', // 選單顯示的名稱, 對應語系檔的 key
    visible: true, // 是否顯示在選單上
    enable: true, // 是否在前端啟用
    isDev: true,
  },
]
export default routes
