import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [ menuOpen, setOpen ] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen, // 垂直模式箭头点击展开
        'is-vertical': context.mode === 'vertical', // 垂直模式箭头点击展开
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen)
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault(); // 为什么要阻止默认行为
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}
    const renderChildren =() => {
        const subMenuClasses = classNames('biubiu-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child, i) => {
            // 类型断言
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <Transition 
                in={menuOpen}
                timeout={300} // active-done的时间段
                animation="zoom-in-left"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu