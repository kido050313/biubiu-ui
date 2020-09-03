import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from './button';
// import ButtonProps from './button';
// import { ButtonProps } from '../../stories/Button';

export default {
    title: 'BiubiuUi/Button自定义按钮',
    component: Button,
} as Meta;


const Template: Story = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
Primary.storyName = '默认按钮'

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};