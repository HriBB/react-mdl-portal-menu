import React, { Component, PropTypes, Children, cloneElement } from 'react'

export default class MenuList extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    closeMenu: PropTypes.func.isRequired,
  }

  render() {
    const { children, closeMenu } = this.props
    return (
      <ul className={'react-mdl-portal-menu__list'}>
        {Children.map(children, (child, index) => cloneElement(child, {
          tabIndex: index + 1,
          closeMenu,
        }))}
      </ul>
    )
  }

}
