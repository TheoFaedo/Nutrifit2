import React, { FunctionComponent } from 'react';

type Props = {
    primary?: string;
}

const ProfileSVG: FunctionComponent<Props> = (props) => {

    const {primary} = props;

    const primaryFill = primary ? primary : 'fill-none';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 374 374" className='h-6'>
            <g>
                <path className={primaryFill} transform="rotate(-180 250 276.5)" stroke-width="5" id="svg_2" d="m192,416l46,-261l150,0l45,261l-241,0z"/>
                <rect className={primaryFill} stroke-width="5" id="svg_3" height="30" width="244" y="65" x="65"/>
            </g>
        </svg>
    );
}

export default ProfileSVG;