import React, { FunctionComponent } from 'react';

type Props = {
    primary?: string;
    secondary?: string;
}

const ProfileSVG: FunctionComponent<Props> = (props) => {

    const {primary, secondary} = props;

    const primaryFill = primary ? ('fill-' + primary) : 'fill-none';
    const secondaryFill = secondary ? ('fill-' + secondary) : 'fill-none';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 374 374" className='h-7' role="button">
            <path className={secondaryFill} d="m186.5,15.5C91.51,15.5,14.5,92.51,14.5,187.5s77.01,172,172,172,172-77.01,172-172S281.49,15.5,186.5,15.5Zm.48,63.67c29.13,0,52.74,23.61,52.74,52.74s-23.61,52.74-52.74,52.74-52.74-23.61-52.74-52.74,23.61-52.74,52.74-52.74Zm0,211.91c-43.82,0-79.35-20.85-79.35-46.56s35.53-46.56,79.35-46.56,79.35,20.85,79.35,46.56-35.53,46.56-79.35,46.56Z"/>
            <circle cx="187" cy="132" r="52.5" className={primaryFill}/>
            <ellipse cx="187" cy="244.5" rx="79.5" ry="47" className={primaryFill}/>
            <circle cx="187" cy="187" r="172" fill="none" stroke="black" strokeMiterlimit="10" strokeWidth="30"/>
        </svg>
    );
}

export default ProfileSVG;