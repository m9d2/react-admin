import {useDynamicSvgImport} from '@/hooks/useDynamicSvgImport.ts';
import {CSSProperties, useEffect, useRef} from "react";

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

    useEffect(() => {
        if (iconColorRef.current) {
            const element = iconColorRef.current;
            if (color) {
                element.children[0].setAttribute("fill", color);
            }
        }
    }, [SvgIcon, iconColorRef.current, color, width, height]);


    return (
        <>
            {SvgIcon && (
                <span ref={iconColorRef} className={wrapperClassName} style={wrapperStyle}>
                    <SvgIcon width={width} height={height}/>
                </span>
            )}
        </>
    );
}

export default SvgIcon;
