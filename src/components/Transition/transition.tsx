import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// 创建动画名称(字符串字面量)
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName 
}

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        ...restProps
    } = props

    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {children}
        </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
}

export default Transition