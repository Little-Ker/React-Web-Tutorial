import React from 'react'
import styles from './invalidPage.module.sass'

function InvalidPage() {
  return (
    <div className={styles.invalidPage}>
      <h1 className={styles.invalidPage__title}>
        {'404'}
      </h1>
      <p className={styles.invalidPage__text}>
        {'sorry! 查無此頁面'}
      </p>
    </div>
  )
}

export default InvalidPage
