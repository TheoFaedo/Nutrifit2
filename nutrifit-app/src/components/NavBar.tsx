import { FunctionComponent, useState } from 'react';
import NavBarIcon from './NavBarIcon';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NavBar: FunctionComponent = () => {

    const { pathname } = useLocation();
    const { t } = useTranslation();
    
    const [sizeEllipse, setSizeEllipse] = useState(3);

    const increaseSize = () => {
        if(window.innerWidth > 1024) {
            setSizeEllipse(6);
        }
    }

    const decreaseSize = () => {
        setSizeEllipse(3);
    }

    const activeTab = pathname === '/diary' ? 0 : pathname === '/createmeal' ? 2 : 1;
    const hidden = pathname !== '/diary' && pathname !== '/profile' && pathname !== '/createmeal';

    return (
        !hidden ?
        <div className={'relative z-[5]'} onMouseEnter={increaseSize} onMouseLeave={decreaseSize}>
            <svg viewBox="0 0 100 10" className='navbar-svg' fill='none'>
                <ellipse cx="50" cy="10" rx="52" ry={sizeEllipse} className="transition-all duration-300"></ellipse>
            </svg>
            <div className="navbar">
                <NavBarIcon active={activeTab === 0 ? true : false} svgname="clipboard" text={t('DiaryPage.DiaryPageTitle')} href="/diary"/>
                <NavBarIcon active={activeTab === 1 ? true : false}  svgname="profile" text={t('ProfilePage.ProfilePageTitle')} href="/profile"/>
                <NavBarIcon active={activeTab === 2 ? true : false} svgname="whitehat" text={t('MealsPage.MealsPageTitle')} href="/createmeal"/>
            </div>
        </div>
        :
        <></>
    );
}

export default NavBar;
