import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport.ts';
import React, {CSSProperties} from "react";

interface IProps {
    iconName: string;
    svgProp?: React.SVGProps<SVGSVGElement>;
    wrapperStyle?: CSSProperties,
    wrapperClassName?: string,
}

function SvgIcon(props: IProps) {
    const { iconName, wrapperStyle, wrapperClassName, svgProp } = props;
    const { SvgIcon } = useDynamicSvgImport(iconName);
    return (
        <>
            {SvgIcon && (
                <span className={wrapperClassName} style={wrapperStyle}>
                    <SvgIcon {...svgProp} />
                </span>
            )}
        </>
    );
}

export default SvgIcon;
