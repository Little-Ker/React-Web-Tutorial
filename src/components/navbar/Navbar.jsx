import React, {
  useCallback, useState, useEffect
} from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import {
  FiberManualRecord, ChevronRight, KeyboardArrowLeft, KeyboardArrowRight
} from '@mui/icons-material'
import { Collapse, IconButton, Tooltip } from '@mui/material'
import routes from '@/router/routes'
import styles from './navbar.module.sass'

export default function Navbar() {
  const location = useLocation()

  const [validRoutes, setValidRoutes] = useState([])

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const handleDrawerOpenToggle = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen)
  }, [isDrawerOpen])

  useEffect(() => {
    const initData = async () => {
      // const permissions = await permissionsAPI()

      const curValidRoutes = routes
        ?.filter(({ enable, visible }) => enable && visible)
        ?.map(curPage => ({
          ...curPage,
          routes: curPage?.routes?.filter(({
            id, isDev, visible, enable,
          }) => {
            if (visible && enable) {
              return isDev
            }
            return false
          }),
        }))
        ?.filter(cur => (!cur?.routes && (cur?.isDev)) || cur?.routes?.length > 0)

      setValidRoutes(curValidRoutes)
    }
    initData()
  }, [])

  const [checked, setChecked] = useState([])

  useEffect(() => {
    const checkList = validRoutes.map((mainRoute) => {
      const findPath = mainRoute?.routes?.find(route => location?.pathname === `${route?.path}`)
      return !!findPath
    })
    setChecked(checkList)
  }, [location, validRoutes])

  const changeCheck = useCallback((index) => {
    if (!isDrawerOpen) {
      handleDrawerOpenToggle()
      setChecked((prev) => {
        const checkList = [...prev]?.map(() => false)
        checkList[index] = true
        return checkList
      })
      return
    }

    setChecked((prev) => {
      const checkList = [...prev]
      checkList[index] = !checkList[index]
      return checkList
    })
  }, [handleDrawerOpenToggle, isDrawerOpen])

  const menuLink = useCallback(route => (
    <Link
      key={route.id}
      to={route.path}
      className={clsx(styles.subLink, location?.pathname === `${route.path}` && styles['subLink--active'])}
    >
      <FiberManualRecord className={styles.subLink__dot} fontSize="small" />
      <p className={clsx(styles.linkText, styles.subLinkText)}>
        {(route.name)}
      </p>
    </Link>
  ), [location])

  return (
    <div className={clsx(styles.root, !isDrawerOpen && styles.drawerClose)}>
      <div className={styles.websiteTitle}>
        {(isDrawerOpen) && (
          <p className={styles.title}>{'Web 樣式文件'}</p>
        )}
        <Tooltip title={(isDrawerOpen) ? 'Collapse Menu' : 'Expand Menu'} placement="right">
          <IconButton onClick={handleDrawerOpenToggle} size="small" className={styles.drawerBtn}>
            {(isDrawerOpen) ? <KeyboardArrowLeft fontSize="small" color="primary" /> : <KeyboardArrowRight fontSize="small" color="primary" />}
          </IconButton>
        </Tooltip>
      </div>
      <div>
        {validRoutes?.map((mainRoute, index) => (
          <div key={mainRoute.id}>
            {(mainRoute?.routes) ? (
              <div
                role="button"
                className={styles.mainLink}
                onClick={() => changeCheck(index)}
                tabIndex={0}
                onKeyDown={(e) => {}}
              >
                <div className={styles.mainLink__Title}>
                  <Tooltip title={(isDrawerOpen) ? '' : mainRoute?.name} placement="right">
                    {mainRoute?.icon}
                  </Tooltip>
                  {(isDrawerOpen) && (
                    <p className={styles.mainLink__Text}>{mainRoute?.name}</p>
                  )}
                </div>
                {(isDrawerOpen) && (
                  <ChevronRight className={clsx(checked[index] && styles['mainLink--open'])} />
                )}
              </div>
            ) : (
              <Link
                key={mainRoute.id}
                to={mainRoute.path}
                className={clsx(styles.mainLink, location?.pathname === `${mainRoute.path}` && styles['mainLink--active'])}
              >
                <div className={styles.mainLink__Title}>
                  <Tooltip title={(isDrawerOpen) ? '' : mainRoute?.name} placement="right">
                    {mainRoute?.icon}
                  </Tooltip>
                  {(isDrawerOpen) && (
                    <p className={styles.mainLink__Text}>{mainRoute?.name}</p>
                  )}

                </div>
              </Link>
            )}
            {(mainRoute?.routes && isDrawerOpen) && (
              <Collapse in={checked[index]}>
                {mainRoute?.routes?.map(route => menuLink(route))}
              </Collapse>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
