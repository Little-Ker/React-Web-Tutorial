import React from 'react'
import PropTypes from 'prop-types'

function Arrow(props) {
  const { strokeColor, className } = props
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23">
      <path className={strokeColor} strokeWidth={2} fill="transparent" strokeMiterlimit="10" d="M13.18 0a11.084 11.084 0 0 0 11.084 11.083" />
      <path className={strokeColor} strokeWidth={2} fill="transparent" strokeMiterlimit="10" d="M24.294 11.083A11.08 11.08 0 0 0 13.21 22.167" />
      <path className={strokeColor} strokeWidth={2} d="m24.295 11.083-24-.1" />
    </svg>
  )
}

Arrow.propTypes = {
  strokeColor: PropTypes.string,
  className: PropTypes.string,
}

Arrow.defaultProps = {
  strokeColor: '',
  className: '',
}

export default Arrow
