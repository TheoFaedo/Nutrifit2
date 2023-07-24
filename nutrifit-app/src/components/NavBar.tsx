import React, { FunctionComponent, useState } from 'react';
import NavBarIcon from './NavBarIcon';

const NavBar: FunctionComponent = () => {

    const [sizeEllipse, setSizeEllipse] = useState(2);

    const increaseSize = () => {
        setSizeEllipse(6);
    }

    const decreaseSize = () => {
        setSizeEllipse(2);
    }

    return (
        <div className='relative z-10' onMouseEnter={increaseSize} onMouseLeave={decreaseSize}>
            <svg viewBox="0 0 100 10" className='navbar-svg'>
                <ellipse cx="50" cy="5" rx="51" ry={sizeEllipse} className="transition-all duration-300"></ellipse>
            </svg>
            <div className="navbar">
                <NavBarIcon active={false} svgname="clipboard" text="Log"/>
                <NavBarIcon active={false} svgname="profile" text="Profile"/>
                <NavBarIcon active={false} svgname="whitehat" text="Create meal"/>
            </div>
        </div>
    );
}

export default NavBar;
