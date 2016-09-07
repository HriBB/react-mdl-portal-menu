import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Card.scss'

const Card = props => {
  const { children, className, ...rest } = props
  const cardClass = classnames('bit-card', className)
  return (
    <div className={cardClass} {...rest}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Card
