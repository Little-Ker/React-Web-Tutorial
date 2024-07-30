import React, {
  useState, useEffect
} from 'react'
import { useLocation } from 'react-router-dom'
import routes from '@/router/routes'
import styles from './subNavbar.module.sass'

function SubNavbar() {
  const location = useLocation()

  const [viewData, setViewData] = useState({})

  useEffect(() => {
    const findPath = routes?.find(route => location?.pathname === `${route?.path}`)
    setViewData(findPath)
  }, [location])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{'CONTENTS'}</p>
      {viewData?.childComponents?.map(cur => (
        <p className={styles.subTitle} key={cur.id}>{cur.name}</p>
      ))}
    </div>
  )
}

export default SubNavbar
