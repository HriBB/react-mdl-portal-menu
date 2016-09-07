import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Button.scss'

const Button = props => {
  const { children, className, ...rest } = props
  const buttonClass = classnames('bit-button', className)
  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Button
