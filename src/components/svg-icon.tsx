import {useDynamicSvgImport} from '@/hooks/useDynamicSvgImport.ts';
import React, {CSSProperties, useEffect, useRef} from "react";

interface IProps {
    color?: string,
    width?: string,
    height?: string,
    iconName: string;
    wrapperStyle?: CSSProperties,
    wrapperClassName?: string,
}

function SvgIcon(props: IProps) {
    const {iconName, wrapperStyle, wrapperClassName, width, height, color} = props;
    const {SvgIcon} = useDynamicSvgImport(iconName);
    const iconColorRef = useRef<any>(null);
    const [svgColor, setSvgColor] = React.useState<string>('');

    useEffect(() => {
        if (iconColorRef.current) {
            const element = iconColorRef.current;
            const parent = element.parentNode;
            const parentColor = window.getComputedStyle(parent).color;
            setSvgColor(color ? color : parentColor);
        }
    }, [SvgIcon, iconColorRef.current, color, width, height]);


    return (
        <>
            {SvgIcon && (
                <span ref={iconColorRef} className={wrapperClassName} style={wrapperStyle}>
                    <SvgIcon fill={svgColor} width={width} height={height}/>
                </span>
            )}
        </>
    );
}

export default SvgIcon;
