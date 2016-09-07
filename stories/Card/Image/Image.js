import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './Image.scss'

const Image = props => {
  const { children, className, src, alt, ...rest } = props
  const imageClass = classnames('bit-card-image', className)
  return (
    <div className={imageClass}>
      <img src={src} alt={alt} {...rest}/>
      {children}
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Image
