import React, { Component, PropTypes, Children, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import classnames from 'classnames'

import './Menu.scss'

import KEYCODES from './keycodes'
import MenuList from './MenuList'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    padding: PropTypes.number,
    target: PropTypes.element.isRequired,
    valign: PropTypes.oneOf(['bottom', 'top']),
  }

  static defaultProps = {
    align: 'left',
    padding: 5,
    valign: 'bottom',
  }

  constructor(props) {
    super(props)
    this.node = null
    this.portal = null
    this.menu = null
    this.open = false
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this)
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this)
    this.onTargetMouseUp = this.onTargetMouseUp.bind(this)
    this.onTargetKeydown = this.onTargetKeydown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.open) {
      this.renderMenu(nextProps)
    }
  }

  componentWillUnmount() {
    if (this.open) {
      this.closeMenu()
    }
  }

  onDocumentKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE) {
      this.closeMenu()
    }
  }

  onDocumentMouseUp = (e) => {
    const portal = findDOMNode(this.portal)
    if (portal.contains(e.target) || (e.button && e.button !== 0)) return
    e.stopPropagation()
    this.closeMenu()
  }

  onTargetMouseUp = (e) => {
    this.openMenu(this.props)
  }

  onTargetKeydown(e) {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.DOWN) {
      this.openMenu()
    }
  }

  positionMenu() {
    const { align, valign, padding } = this.props
    const { innerWidth, innerHeight, scrollX, scrollY } = window
    const targetNode = findDOMNode(this)
    const portalNode = findDOMNode(this.portal)
    const target = targetNode.getBoundingClientRect()
    const portal = portalNode.getBoundingClientRect()

    let menuX, menuY, originX, originY, above, below, maxHeight, constrain

    if (align === 'left') {
      // align left
      menuX = target.left + scrollX
      originX = 'left'
      // out of bounds, move to right
      if ((menuX + portal.width) > (innerWidth + scrollX)) {
        menuX = target.right + scrollX - portal.width
        originX = 'right'
      }
    } else {
      // align right
      menuX = target.right + scrollX - portal.width
      originX = 'right'
      // out of bounds, move to left
      if (menuX < 0) {
        menuX = target.left + scrollX
        originX = 'left'
      }
    }

    // calculate space above/below target
    above = target.top
    below = innerHeight - target.bottom

    if (valign === 'top') {
      // show at the top
      menuY = target.top - portal.height + scrollY
      originY = 'bottom'
      // out of bounds, move to bottom if there is more space
      if (menuY < 0 && below > above) {
        menuY = target.bottom + scrollY
        originY = 'top'
      }
    } else {
      // show at the bottom
      menuY = target.bottom + scrollY
      originY = 'top'
      // out of bounds, move to top if there is more space
      if ((menuY + portal.height) > (innerHeight + scrollY) && above > below) {
        menuY = target.top - portal.height + scrollY
        originY = 'bottom'
      }
    }

    // set max height
    maxHeight = portal.height

    // constrain to viewport
    if (originY === 'top') {
      // originY is top, which means show menu at the bottom
      if (portal.height > (innerHeight - target.bottom)) {
        maxHeight = innerHeight - target.bottom - 10
        constrain = true
      }
    } else {
      // originY is top, which means show menu at the top
      if (portal.height > target.top) {
        maxHeight = target.top - 10
        menuY = scrollY + 10
        constrain = true
      }
    }

    // set initial style
    this.node.style.height = `0px`
    this.node.style.left = `${menuX}px`
    this.node.style.top = `${menuY}px`
    this.node.style.transform = `scale3d(0.01, 0.01, 1)`
    this.node.style.transformOrigin = `${originX} ${originY}`

    // constrain portal
    if (constrain) {
      portalNode.style.maxHeight = `${maxHeight}px`
    }

    // do the animation with a slight delay
    // TODO: figure out how to wait for initial styles
    setTimeout(() => {
      this.node.style.opacity = `1`
      this.node.style.height = `${maxHeight}px`
      this.node.style.transform = `scale3d(1, 1, 1)`
      this.node.style.transition = `transform 0.2s ease`
    }, 20)
  }

  focusMenu() {
    const portal = findDOMNode(this.portal)
    portal.firstChild.focus()
  }

  renderMenu(props) {
    const { children, className } = props
    if (!this.node) {
      this.node = document.createElement('div')
      this.node.className = classnames('react-mdl-portal-menu', className)
      document.body.appendChild(this.node)
      document.addEventListener('keydown', this.onDocumentKeydown)
      document.addEventListener('mouseup', this.onDocumentMouseUp)
    }
    const list = <MenuList closeMenu={this.closeMenu}>{children}</MenuList>
    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(this, list, this.node)
    this.open = true
    this.positionMenu()
  }

  openMenu(props) {
    if (!this.open) {
      this.renderMenu(props || this.props)
      this.focusMenu()
    }
  }

  closeMenu = () => {
    document.removeEventListener('keydown', this.onDocumentKeydown)
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    ReactDOM.unmountComponentAtNode(this.node)
    document.body.removeChild(this.node)
    this.portal = null
    this.node = null
    this.open = false
  }

  render() {
    return cloneElement(this.props.target, {
      onMouseUp: this.onTargetMouseUp,
      onKeyDown: this.onTargetKeydown,
    })
  }

}
