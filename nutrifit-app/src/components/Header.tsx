import { FunctionComponent } from 'react';
import WhiteHatSVG from '../svg/WhiteHatSVG';

const Header: FunctionComponent = () => {

    return (
        <div className="header">
            <WhiteHatSVG className="h-7 mx-2" fillPrimary="fill-main" fillSecondary="fill-none"/>
            <div className='font-britannic'>nutrifit</div>
        </div>
    );
}

export default Header;
