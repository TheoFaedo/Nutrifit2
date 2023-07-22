import React from 'react';
import WhiteHatSVG from '../svg/WhiteHatSVG';

function Header() {

    return (
        <div className="bg-neutral-950 h-16 flex justify-center content-stretch items-center text-main text-2xl w-full">
            <WhiteHatSVG className="h-7 fill-main mx-2"/>
            <div className='font-britannic'>nutrifit</div>
        </div>
    );
}

export default Header;
