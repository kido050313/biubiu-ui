import React, { useState,createContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'
import { render } from 'react-dom';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback
}

interface IMenuContext {
    index?: number,
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, children, onSelect } = props;
    const [ currentActive, setActive ] = useState(defaultIndex);
    const classes = classNames('biubiu-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    }) 
    const handleClick = (index: number) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // 类型断言转成functionComponent实例获得displayname
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index })
            } else {
                console.error("warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps ={
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;