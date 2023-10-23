import { FunctionComponent, memo } from 'react';
import WhiteHatSVG from '../svg/WhiteHatSVG';

const Header: FunctionComponent = memo(() => {

    return (
        <div className="header">
            <WhiteHatSVG className="h-7 mx-2" fillPrimary="fill-main" fillSecondary="fill-none" isImg/>
            <h1 className='font-britannic'>nutrifit</h1>
        </div>
    );
})

export default Header;
