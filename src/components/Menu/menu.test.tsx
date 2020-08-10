import React from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
}

// 通用元素放到beforeEach()中
// 获取最外层(Menu)节点,可使用data-testid
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                theshy
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

let createStyleFile = () => {
    const cssFile: string = `
    .biubiu-submenu {
        display: none
    }
    .biubiu-submenu.menu-opened {
        display:block
    }`
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style;
}

let wrapper:RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement:HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component',  () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props',  ()=> {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('biubiu-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback',  () => {
        const thirdItem = wrapper.getByText('theshy')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on subMenu', async() => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible() // queryByText有可能返回html为null
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        // expect(wrapper.queryByText('drop1')).toBeVisible() // 这样会失败是因为settimeout异步操作
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait (() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible() 
        })
    })
})

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode ', () => {
        const dropdownItem = wrapper2.queryByText('drop1')
        expect(dropdownItem).not.toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(dropdownItem).toBeVisible()
    })
    it('should show submenu dropdown when defaultOpenSubMenus contains subMenu index', ()=> {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})