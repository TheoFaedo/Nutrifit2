import React, { FunctionComponent } from 'react';

type Props = {
    primary?: string;
    secondary?: string;
}

const ClipBoardSVG: FunctionComponent<Props> = (props) => {

    const {primary, secondary} = props;

    const primaryFill = primary ? ('fill-' + primary) : 'fill-none';
    const secondaryFill = secondary ? ('fill-' + secondary) : 'fill-none';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 291" className='h-7' role="button">
            <path className={secondaryFill} d="m203.29,0H40.71C18.23,0,0,18.23,0,40.71v209.58c0,22.48,18.23,40.71,40.71,40.71h162.58c22.48,0,40.71-18.23,40.71-40.71V40.71c0-22.48-18.23-40.71-40.71-40.71Zm-11.29,171H52v-20h140v20Zm0-32H52v-20h140v20Zm0-32H52v-20h140v20Zm0-32H52v-20h140v20Z"/>
            <rect x="52" y="55" width="140" height="20" className={primaryFill}/>
            <rect x="52" y="87" width="140" height="20" className={primaryFill}/>
            <rect x="52" y="119" width="140" height="20" className={primaryFill}/>
            <rect x="52" y="151" width="140" height="20" className={primaryFill}/>
            <path d="m203.29,30c5.91,0,10.71,4.8,10.71,10.71v209.58c0,5.91-4.8,10.71-10.71,10.71H40.71c-5.91,0-10.71-4.8-10.71-10.71V40.71c0-5.91,4.8-10.71,10.71-10.71h162.58m0-30H40.71C18.23,0,0,18.23,0,40.71v209.58c0,22.48,18.23,40.71,40.71,40.71h162.58c22.48,0,40.71-18.23,40.71-40.71V40.71c0-22.48-18.23-40.71-40.71-40.71h0Z" className={primaryFill}/>
        </svg>
    );
}

export default ClipBoardSVG;