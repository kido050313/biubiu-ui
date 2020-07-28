import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => alert(index)} mode='vertical'>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cute link 
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            shy link
          </MenuItem>
        </Menu>

        <Button className="custom"> Hello </Button>
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>button primary</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>button primary</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>百度</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">百度</Button>
        <a href="http://www.baidu.com" target="_blank">baidu.com.</a>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ); 
}

export default App;
