import React, { FunctionComponent } from 'react';

type Props = {
    className?: string;
    primary?: string;
    secondary?: string;
}

const WhiteHatSVG: FunctionComponent<Props> = (props) => {

    const {primary, secondary, className} = props;

    const primaryFill = 'fill-' + primary;
    const secondaryFill = 'fill-' + secondary;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 266" className={className}>
            <rect x="135.55" y="172.97" width="14" height="50.85" className={primaryFill}/>
            <rect x="168.55" y="172.97" width="14" height="50.85" className={primaryFill}/>
            <rect x="102.55" y="172.97" width="14" height="50.85" className={primaryFill}/>
            <path className={secondaryFill} d="m265.98,53.94c-8.11-12.21-22.93-17.37-36.64-16.2s-26.54,7.77-38.49,15.26c-5.18-22.93-25.32-39.95-46.81-39.66-21.66-.29-42.95,16.98-48.17,39.84-12.04-7.47-24.97-14.05-38.78-15.22-13.82-1.17-28.75,3.98-36.92,16.15-6.09,9.07-7.77,21.08-5.89,32.12,1.88,11.04,7.06,21.17,13.54,29.9,8.69,11.7,19.88,21.38,26.39,34.65,11.56,23.58,3.82,53.47,8.15,79.77.94,5.74,2.72,12.58,7.69,14.78,47.19,19.74,96.75,18.23,144-1,4.93-2.2,7.14-8.69,8.08-14.45,4.3-26.38-1.4-55.36,10.08-79,6.46-13.31,17.56-23.02,26.18-34.75,6.44-8.76,11.58-18.92,13.44-29.99,1.86-11.07.19-23.12-5.85-32.22ZM116.99,223.99h-14v-50.85h14v50.85Zm33,0h-14v-50.85h14v50.85Zm33,0h-14v-50.85h14v50.85Z"/>
            <path className={primaryFill} d="m143.99,0c-22.19-.2-43.05,13.35-54.12,32.21-3.17,5.41-5.65,11.43-7.07,17.54l19.83-8.07c-5.63-3.48-11.4-6.77-17.46-9.43-6.83-3-13.77-5.66-21.18-6.76-3.9-.58-7.8-1.11-11.75-1.03-3.67.08-7.38.57-10.98,1.24-2.62.49-5.2,1.22-7.69,2.19-3.45,1.34-6.89,2.8-10.02,4.79-6.29,4.01-11.53,9.17-15.54,15.46-2.18,3.43-3.81,7.28-5.12,11.1s-1.9,7.79-2.43,11.81c-1.87,14.4,2.24,29.09,9.04,41.7s17.97,23.42,27.05,35.1l-2.11-2.73c3.66,4.74,6.92,9.77,9.28,15.29l-1.36-3.22c2.33,5.57,3.71,11.44,4.52,17.4l-.48-3.59c1.26,9.67,1.09,19.44.98,29.17-.12,10.82.1,21.48,1.62,32.21.74,5.2,2.05,10.07,4.44,14.8,1.29,2.56,3.13,5.05,5.36,6.86,1.13.92,2.27,1.9,3.53,2.65s2.89,1.31,4.08,1.81c1.29.54,2.58,1.06,3.87,1.57,9.92,3.89,20.17,6.94,30.61,9.05,11.28,2.27,22.81,3.65,34.31,3.93,11.46.28,22.81-.68,34.15-2.31,10.44-1.5,20.75-3.87,30.82-7,5.19-1.61,10.31-3.43,15.36-5.43,4.12-1.63,7.68-3.1,10.87-6.3,2.06-2.07,3.88-4.6,5.1-7.28,1.32-2.9,2.5-5.82,3.18-8.93s1.08-6.62,1.49-9.92c.62-4.94.93-9.91,1.13-14.88.4-9.89.31-19.81,1.09-29.68.19-2.4.44-4.8.75-7.18l-.48,3.59c.94-6.98,2.53-13.85,5.26-20.36l-1.36,3.22c2.45-5.73,5.81-10.94,9.6-15.86l-2.11,2.73c8.13-10.47,17.7-19.84,24.55-31.29,7.3-12.2,12.03-26.65,11.34-40.99s-6.21-29.38-17.83-38.62c-2.93-2.33-5.85-4.53-9.21-6.19s-6.68-3.04-10.18-4.03-7.25-1.5-10.91-1.89c-2.58-.27-5.19-.32-7.78-.14-8.16.56-16.05,2.41-23.59,5.53s-15.24,7.13-22.44,11.63c6.61,2.69,13.22,5.38,19.83,8.07-4.96-21.59-21.27-39.72-42.22-46.83-2.3-.78-4.67-1.37-7.07-1.75-3.49-.55-6.99-1.02-10.53-.99s-7.08,1.48-9.55,3.95c-2.34,2.34-4.1,6.18-3.95,9.55s1.3,7.11,3.95,9.55,5.9,3.99,9.55,3.95c1.98-.02,3.95.1,5.91.35l-3.59-.48c3.8.52,7.49,1.55,11.03,3.01l-3.22-1.36c3.9,1.65,7.55,3.81,10.91,6.4l-2.73-2.11c3.41,2.67,6.47,5.74,9.14,9.16l-2.11-2.73c2.79,3.61,5.1,7.55,6.91,11.74l-1.36-3.22c1.23,2.91,2.2,5.91,2.91,8.99,1.92,8.36,12.65,12.56,19.83,8.07,6.03-3.78,12.24-7.3,18.79-10.09l-3.22,1.36c5.46-2.29,11.12-4.04,16.99-4.87l-3.59.48c4.11-.55,8.22-.61,12.33-.08l-3.59-.48c3.83.52,7.57,1.51,11.13,3.01l-3.22-1.36c2.98,1.29,5.79,2.91,8.36,4.89l-2.73-2.11c2.3,1.81,4.36,3.87,6.15,6.18l-2.11-2.73c1.82,2.4,3.31,5,4.5,7.76l-1.36-3.22c1.47,3.52,2.44,7.21,2.98,10.99l-.48-3.59c.6,4.55.58,9.14-.01,13.69l.48-3.59c-.73,5.28-2.22,10.41-4.28,15.32l1.36-3.22c-2.81,6.62-6.6,12.73-10.98,18.42l2.11-2.73c-4.67,6.03-9.89,11.6-14.67,17.54-3.06,3.8-6.08,7.67-8.67,11.8s-4.58,8.52-6.41,13.05c-3.26,8.09-4.65,16.71-5.62,25.33-.89,7.87-1.06,15.8-1.24,23.72-.2,8.93-.41,17.88-1.58,26.74l.48-3.59c-.49,3.62-1.12,7.22-2.54,10.61l1.36-3.22c-.58,1.32-1.26,2.57-2.13,3.72l2.11-2.73c-.63.8-1.33,1.52-2.15,2.15l2.73-2.11c-.55.39-1.11.73-1.72,1.02l3.22-1.36c-16.01,6.49-32.74,11.15-49.86,13.47l3.59-.48c-15.94,2.12-32.09,2.2-48.04.09l3.59.48c-15.85-2.14-31.34-6.41-46.1-12.57l3.22,1.36c-.59-.27-1.13-.6-1.65-.98l2.73,2.11c-.68-.54-1.28-1.15-1.82-1.83l2.11,2.73c-.83-1.1-1.48-2.3-2.02-3.57l1.36,3.22c-1.42-3.48-2.07-7.22-2.58-10.93l.48,3.59c-2.12-15.91-.4-31.99-1.22-47.97-.45-8.75-1.49-17.73-4.27-26.07-1.54-4.63-3.52-9.2-5.95-13.43s-5.36-8.08-8.35-11.92c-5.43-6.98-11.6-13.34-17.03-20.32l2.11,2.73c-4.38-5.68-8.16-11.8-10.96-18.42l1.36,3.22c-1.98-4.78-3.42-9.75-4.14-14.87l.48,3.59c-.6-4.54-.62-9.11-.01-13.65l-.48,3.59c.52-3.63,1.44-7.17,2.84-10.57l-1.36,3.22c1.22-2.89,2.77-5.61,4.68-8.1l-2.11,2.73c1.8-2.29,3.85-4.33,6.14-6.12l-2.73,2.11c2.57-1.97,5.36-3.58,8.33-4.87l-3.22,1.36c3.56-1.5,7.28-2.5,11.1-3.03l-3.59.48c4.22-.56,8.46-.51,12.68.04l-3.59-.48c6,.84,11.79,2.62,17.37,4.95l-3.22-1.36c6.52,2.77,12.71,6.25,18.72,9.97,7.21,4.46,17.88.31,19.83-8.07.66-2.84,1.56-5.6,2.68-8.29l-1.36,3.22c1.77-4.14,4.05-8.01,6.78-11.59l-2.11,2.73c2.8-3.6,6.01-6.83,9.6-9.64l-2.73,2.11c3.54-2.73,7.39-5.02,11.51-6.77l-3.22,1.36c3.72-1.55,7.61-2.64,11.61-3.19l-3.59.48c1.99-.26,3.98-.38,5.98-.36,3.44.03,7.12-1.53,9.55-3.95s4.1-6.18,3.95-9.55-1.3-7.11-3.95-9.55S147.66.04,143.99,0Z"/>
        </svg>
    );
}

export default WhiteHatSVG;
