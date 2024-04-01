import SvgIcon from '@/components/svg-icon.tsx'; // use Dynamic SVG

export default function Index() {
    return (
        <SvgIcon iconName="camera" svgProp={{
            className: 'logo',
            width: 100,
            height: 100,
            fill: '#61dafb',
        }}/>
    )
}