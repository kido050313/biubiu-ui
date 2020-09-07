import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './button';

export default {
    title: 'BiubiuUi/Button自定义按钮',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

const onClick = () => {
  console.log('click')
}

export const Primary = Template.bind({});
Primary.args = {
  className: 'klass',
  disabled: false,
  size: 'sm',
  btnType: 'primary',
  children: 'Button',
  href: '',
  onClick: () => onClick(),
  style: {background: 'pink', border: 'none'},
};
Primary.storyName = '默认按钮'

export const Tertiary = Template.bind({});
Tertiary.args = {
  size: 'lg',
  disabled: true,
  children: '😄👍😍💯'
}
Tertiary.storyName = '表情按钮'

// export

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };