import { FunctionComponent, useState } from 'react';
import NavBarIcon from './NavBarIcon';

type Props = {
    hidden?: boolean;
}

const NavBar: FunctionComponent<Props> = (props) => {
    
    const [sizeEllipse, setSizeEllipse] = useState(2);
    const [active, setActive] = useState(1);

    const increaseSize = () => {
        if(window.innerWidth > 1024) {
            setSizeEllipse(6);
        }
    }

    const decreaseSize = () => {
        setSizeEllipse(2);
    }

    const setActiveTab = (index: number) => {
        setActive(index);
    }

    const hidden = props.hidden ? "hidden" : "";

    return (
        <div className={'relative z-10 ' + hidden} onMouseEnter={increaseSize} onMouseLeave={decreaseSize}>
            <svg viewBox="0 0 100 10" className='navbar-svg'>
                <ellipse cx="50" cy="5" rx="51" ry={sizeEllipse} className="transition-all duration-300"></ellipse>
            </svg>
            <div className="navbar">
                <NavBarIcon active={active === 0 ? true : false} svgname="clipboard" text="Diary" href="/diary" onClick={() => setActiveTab(0)}/>
                <NavBarIcon active={active === 1 ? true : false}  svgname="profile" text="Profile" href="/profile" onClick={() => setActiveTab(1)}/>
                <NavBarIcon active={active === 2 ? true : false} svgname="whitehat" text="Meals" href="/createmeal" onClick={() => setActiveTab(2)}/>
            </div>
        </div>
    );
}

export default NavBar;
