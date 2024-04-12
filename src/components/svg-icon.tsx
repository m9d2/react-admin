import React, { ReactElement, useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { GetProps } from "antd";

type IconComponentProps =
    GetProps<typeof Icon>
    & { iconName: string }
    & { component: React.ComponentType<IconComponentProps | React.SVGProps<SVGSVGElement>> | React.ForwardRefExoticComponent<IconComponentProps> | undefined };

const SvgIcon = (props: Partial<IconComponentProps>) => (
    <Icon component={props.component}></Icon>
)

const DynamicsSvgIcon = ({ iconName, ...restProps }: Partial<IconComponentProps>) => {
    const [iconComponent, setIconComponent] = useState<ReactElement | null>(null);

    useEffect(() => {
        const loadIconComponent = async () => {
            const { default: DynamicIcon } = await import(`../icons/${iconName}.tsx`);
            setIconComponent(<Icon component={DynamicIcon} {...restProps} />);
        };

        (async () => {
            await loadIconComponent();
        })();
    }, [iconName, restProps]);

    return iconComponent;
};

export { SvgIcon, DynamicsSvgIcon };
