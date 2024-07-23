import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import styles from './navbarEx02.module.sass'

function NavbarEx02() {
  const [linkStatus, setLinkStatus] = useState(0)
  const [isShowMenu, setIsShowMenu] = useState(false)

  const linksMenu = [{
    linkName: '連結 A',
    childMenu: [{
      path: '#',
      linkName: '連結 A - A',
    }, {
      path: '#',
      linkName: '連結 A - B',
    }, {
      path: '#',
      linkName: '連結 A - C',
    }],
  }, {
    path: '#',
    linkName: '連結 B',
  }, {
    path: '#',
    linkName: '連結 C',
  }]

  useEffect(() => {
    const linkStatusAry = linksMenu.map(() => false)
    setLinkStatus(linkStatusAry)
  }, [])

  const onClickShowSubMenu = useCallback((pos) => {
    setLinkStatus((prev) => {
      prev[pos] = !prev[pos]
      return [...prev]
    })
  }, [linkStatus])

  return (
    <div className={styles.navbarEx01}>
      <div className={styles.navbar}>
        <div className={styles.logo} />
        <div className={clsx(styles.sidebar, (isShowMenu && styles.showMenu))}>
          <div className={styles.menu}>
            {linksMenu.map((cur, index) => {
              if (cur?.childMenu) {
                return (
                  <div
                    key={cur.linkName}
                    className={clsx(styles.link, (cur?.childMenu && styles.mainLink))}
                  >
                    <p
                      className={styles.mainLinkTitle}
                      onClick={() => onClickShowSubMenu(index)}
                    >
                      {cur.linkName}
                    </p>
                    <div
                      className={clsx(styles.subMenu, (linkStatus[index] && styles.showSubMenu))}
                    >
                      {cur?.childMenu?.map(subMenu => (
                        <a
                          key={subMenu.linkName}
                          href={subMenu.path}
                          className={clsx(styles.link, styles.subLink)}
                        >
                          {subMenu.linkName}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <a
                  key={cur.linkName}
                  href={cur.path}
                  className={clsx(styles.link)}
                >
                  {cur.linkName}
                </a>
              )
            })}
          </div>
        </div>
        <div className={styles.hamburgerBtn} onClick={() => setIsShowMenu(!isShowMenu)}>
          <div className={clsx(styles.hamburger, (isShowMenu && styles.crossBtn))} />
        </div>
      </div>
    </div>
  )
}

export default NavbarEx02
