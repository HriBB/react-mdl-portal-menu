import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './IconButton.scss'

const IconButton = props => {
  const { className, name, ...rest } = props
  const buttonClass = classnames('bit-icon-button', className)
  const iconClass = classnames(`icon-${name}`)
  return (
    <button className={buttonClass} {...rest}>
      <i className={iconClass}/>
    </button>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default IconButton
