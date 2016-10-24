# React-MDL Portal Menu

## Deprecated! Use Menu component from [react-mdl-extra](https://github.com/HriBB/react-mdl-extra)

Portal Menu component for [React Material Design Lite](https://github.com/tleunen/react-mdl).
Menu is rendered to the `body`, so no more parent `overflow:hidden` problems ;)

## Installation

```
npm install --save react-mdl-portal-menu
```

## Examples

https://hribb.github.io/react-mdl-portal-menu/

```
git clone https://github.com/HriBB/react-mdl-portal-menu
cd react-mdl-portal-menu
npm install
npm run storybook
open http://localhost:9002/
```

## Usage

```
<Menu target={<Button style={{margin:'20px'}}>Open menu</Button>}>
  <MenuItem onClick={() => console.log('select one')}>One</MenuItem>
  <MenuItem onClick={() => console.log('select two')}>Two</MenuItem>
  <MenuItem onClick={() => console.log('select three')}>Three</MenuItem>
</Menu>
```

## TODO

- [ ] Add some tests
- [x] Pray for a good `Menu` component in [`mdl v2`](https://github.com/google/material-design-lite/issues/4475)

## Component boilerplate

Using [react-component-boilerplate](https://github.com/ritz078/react-component-boilerplate)
with some modifications and improvements.
