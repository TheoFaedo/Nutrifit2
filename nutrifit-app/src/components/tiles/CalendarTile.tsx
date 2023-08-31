
import { FunctionComponent, useState } from 'react';


type Props = {
    date: Date;
    nextHandler: Function;
    prevHandler: Function;
}

const formatDate = (date: Date) => {

    if(date.toDateString() === new Date().toDateString()) {
        return 'Today';
    }else if(date.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
        return 'Yesterday';
    }else if(date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
        return 'Tomorrow';
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    // Extract the first three letters of each part of the date
    const [weekday, day, month, year] = formattedDate.split(' ');
    const formattedString = `${weekday.slice(0, 3)} ${day} ${month.slice(0, 3)} ${year}`;
  
    return formattedString;
  };

const CalendarTile: FunctionComponent<Props> = ({date, nextHandler, prevHandler}) => {

    return (
        <div className='bg-neutral-900 flex justify-center items-center text-white font-inter py-3 mt-3 text-3xl'>
            <button className='rounded-full text-2xl gradient-bg font-medium mx-4 w-8 h-8' onClick={() => prevHandler()}>&lt;</button>
            <div className='text-base font-medium w-40'>{formatDate(date)}</div>
            <button className='rounded-full text-2xl gradient-bg font-medium mx-4 w-8 h-8' onClick={() => nextHandler()}>&gt;</button>
        </div>
    );
}

export default CalendarTile;