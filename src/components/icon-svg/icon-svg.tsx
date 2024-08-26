import Icon from '@ant-design/icons';
import { GetProps } from 'antd';
import React from 'react';

type IconComponentProps = GetProps<typeof Icon> & { iconName: string } & {
  component:
    | React.ComponentType<IconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<IconComponentProps>
    | undefined;
};

const IconSvg = (props: Partial<IconComponentProps>) => (
  <Icon component={props.component}></Icon>
);

export default IconSvg;
