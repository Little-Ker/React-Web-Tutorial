import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CodeResult from '@/components/codeResult'
import routes from '../../router/routes'
import NavbarEx01 from './sub/navbarEx01/NavbarEx01'
import NavbarEx02 from './sub/navbarEx02/NavbarEx02'
import styles from './navbarView.module.sass'

function Navbar() {
  useEffect(() => {
    console.log('NAV==========')
  })
  const navList = routes.routes
  console.log('navList', navList)

  let location = useLocation().pathname.split('/')[1]
  if (location === '' || location === 'React-Personal-Website') location = 'install'

  return (
    <div className={styles.navbarView}>
      <div className={styles.webTitle}>
        <p className={styles.title}>{'[ 導覽頁 ]'}</p>
      </div>
      <div>
        <CodeResult code={<NavbarEx01 />} />
      </div>
      <div>
        <CodeResult code={<NavbarEx02 />} />
      </div>
      <div className={styles.linkList} />
    </div>
  )
}

export default Navbar
