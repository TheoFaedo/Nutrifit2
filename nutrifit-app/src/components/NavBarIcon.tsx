import { FunctionComponent, useState } from 'react';
import WhiteHatSVG from '../svg/WhiteHatSVG';
import ClipBoardSVG from '../svg/ClipBoardSVG';
import ProfileSVG from '../svg/ProfileSVG';


type Props = {
    active: Boolean;
    svgname: string;
    text: string;
}

const NavBarIcon: FunctionComponent<Props> = (props) => {

    

    const {active, svgname, text} = props;

    const [actived, setActived] = useState(active);

    const svg = svgname === "whitehat" ? <WhiteHatSVG className="h-7" primary={!actived ? "neutral-950" : "none"} secondary={actived ? "neutral-950" : "none"} /> :
            svgname === "clipboard" ? <ClipBoardSVG primary={!actived ? "neutral-950" : "none"} secondary={actived ? "neutral-950" : "none"} /> :
            svgname === "profile" ? <ProfileSVG primary={!actived ? "neutral-950" : "none"} secondary={actived ? "neutral-950" : "none"}/> :
            null;
    
    const onClick = () => {
        setActived(!actived);
    }

    return (
        <div className="navbar-icon" onClick={onClick}>
            <div className='navbar-icon-child'>
                {svg}
                <div>{text}</div>
            </div>
        </div>
    );
}

export default NavBarIcon;
