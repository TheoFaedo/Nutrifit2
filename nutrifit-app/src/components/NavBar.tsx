import { FunctionComponent, useContext, useState } from 'react';
import NavBarIcon from './NavBarIcon';
import { NavBarContext } from '../context/NavBarContext';

type Props = {
    hidden?: boolean;
}

const NavBar: FunctionComponent<Props> = (props) => {
    
    const [sizeEllipse, setSizeEllipse] = useState(2);
    const {activeTab, setActiveTab, navBarVisible} = useContext(NavBarContext);

    const increaseSize = () => {
        if(window.innerWidth > 1024) {
            setSizeEllipse(6);
        }
    }

    const decreaseSize = () => {
        setSizeEllipse(2);
    }

    const setActiveTabHandler = (index: number) => {
        setActiveTab(index);
    }

    const hidden = props.hidden ? "hidden" : "";

    return (
        navBarVisible ? <div className={'relative z-10 ' + hidden} onMouseEnter={increaseSize} onMouseLeave={decreaseSize}>
            <svg viewBox="0 0 100 10" className='navbar-svg'>
                <ellipse cx="50" cy="5" rx="51" ry={sizeEllipse} className="transition-all duration-300"></ellipse>
            </svg>
            <div className="navbar">
                <NavBarIcon active={activeTab === 0 ? true : false} svgname="clipboard" text="Diary" href="/diary" onClick={() => setActiveTabHandler(0)}/>
                <NavBarIcon active={activeTab === 1 ? true : false}  svgname="profile" text="Profile" href="/profile" onClick={() => setActiveTabHandler(1)}/>
                <NavBarIcon active={activeTab === 2 ? true : false} svgname="whitehat" text="Meals" href="/createmeal" onClick={() => setActiveTabHandler(2)}/>
            </div>
        </div>
        :
        <>
        </>
    );
}

export default NavBar;
