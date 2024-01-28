import { FunctionComponent, useContext, useState } from 'react';
import NavBarIcon from './NavBarIcon';
import { NavBarContext } from '../context/NavBarContext';
import { useTranslation } from 'react-i18next';

type Props = {
    hidden?: boolean;
}

const NavBar: FunctionComponent<Props> = (props) => {

    const { t } = useTranslation();
    
    const [sizeEllipse, setSizeEllipse] = useState(3);
    const {activeTab, setActiveTab, navBarVisible} = useContext(NavBarContext);

    const increaseSize = () => {
        if(window.innerWidth > 1024) {
            setSizeEllipse(6);
        }
    }

    const decreaseSize = () => {
        setSizeEllipse(3);
    }

    const setActiveTabHandler = (index: number) => {
        setActiveTab(index);
    }

    const hidden = props.hidden ? "hidden" : "";

    return (
        navBarVisible ? <div className={'relative z-[5]' + hidden} onMouseEnter={increaseSize} onMouseLeave={decreaseSize}>
            <svg viewBox="0 0 100 10" className='navbar-svg' fill='none'>
                <ellipse cx="50" cy="10" rx="52" ry={sizeEllipse} className="transition-all duration-300"></ellipse>
            </svg>
            <div className="navbar">
                <NavBarIcon active={activeTab === 0 ? true : false} svgname="clipboard" text={t('DiaryPage.DiaryPageTitle')} href="/diary" onClick={() => setActiveTabHandler(0)}/>
                <NavBarIcon active={activeTab === 1 ? true : false}  svgname="profile" text={t('ProfilePage.ProfilePageTitle')} href="/profile" onClick={() => setActiveTabHandler(1)}/>
                <NavBarIcon active={activeTab === 2 ? true : false} svgname="whitehat" text={t('MealsPage.MealsPageTitle')} href="/createmeal" onClick={() => setActiveTabHandler(2)}/>
            </div>
        </div>
        :
        <>
        </>
    );
}

export default NavBar;
