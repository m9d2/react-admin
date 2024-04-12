import {SvgIcon} from '@/components/svg-icon.tsx'; // use Dynamic SVG
import HomeSvg from "@/icons/home.tsx";

export default function Index() {
    return (
        <div style={{color: 'red'}}>
            <SvgIcon component={HomeSvg}/>
        </div>
    )
}