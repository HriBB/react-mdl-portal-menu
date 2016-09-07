import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

import KEYCODES from './keycodes'

export default class MenuItem extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    closeMenu: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
  }

  onClick = () => {
    const { closeMenu, onClick } = this.props
    if (onClick) onClick(this.props)
    closeMenu()
  }

  onKeyDown = (e) => {
    if (e.keyCode === KEYCODES.UP || e.keyCode === KEYCODES.DOWN) {
      const node = findDOMNode(this)
      const children = node.parentNode.children
      const i = [].indexOf.call(children, node)
      const len = children.length
      const next = e.keyCode === KEYCODES.DOWN ? (i+1)%len : (i+len-1)%len
      children[next].focus()
    } else if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      this.onClick()
    }
  }

  render() {
    const { children, tabIndex } = this.props
    return (
      <li className={'react-mdl-portal-menu__item'} tabIndex={tabIndex} onClick={this.onClick} onKeyDown={this.onKeyDown}>
        {children}
      </li>
    )
  }

}
