import { FunctionComponent, useState } from 'react';
import WhiteHatSVG from '../svg/WhiteHatSVG';
import ClipBoardSVG from '../svg/ClipBoardSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


type Props = {
    active: Boolean;
    svgname: string;
    text: string;
    href?: string;
    onClick?: Function;
}

const NavBarIcon: FunctionComponent<Props> = (props) => {

    const navigate = useNavigate();

    const {active, svgname, text} = props;

    const link = props.href ? props.href : "";

    const svg = svgname === "whitehat" ? <WhiteHatSVG className="h-7" fillPrimary={!active ? "fill-neutral-950" : "fill-none"} fillSecondary={active ? "fill-neutral-950" : "fill-none"} /> :
            svgname === "clipboard" ? <ClipBoardSVG primary={!active ? "neutral-950" : "none"} secondary={active ? "neutral-950" : "none"} /> :
            svgname === "profile" ? <ProfileSVG primary={!active ? "neutral-950" : "none"} secondary={active ? "neutral-950" : "none"}/> :
            null;
    
    const onClick = () => {
        props.onClick?.();
        navigate(link);
    }

    return (
        <div className="navbar-icon" onClick={onClick} >
            <NavLink to={
                svgname === "whitehat" ?  "/createmeal" :
                svgname === "clipboard" ? "/diary" :
                svgname === "profile" ? "/profile" :
                "/profile"
            }
            >
                <div className='navbar-icon-child'>
                    {svg}
                    <div>{text}</div>
                </div>
            </NavLink>
        </div>
        
    );
}

export default NavBarIcon;
