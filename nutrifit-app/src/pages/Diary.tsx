import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavBarContext } from '../context/NavBarContext';
import CalendarTile from "../components/tiles/CalendarTile";

const Diary: FunctionComponent = () => {

    const { showNavBar } = useContext(NavBarContext);

    const [date, setDate] = useState(new Date());

    const prevHandler = () => {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        setDate(prevDate);
    }

    const nextHandler = () => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        setDate(nextDate);
    }

    useEffect(() => {
        showNavBar();
    }, [showNavBar])

    return (
        <>
            <CalendarTile date={date} prevHandler={() => {prevHandler()}} nextHandler={() => {nextHandler()}} />
        </>
    );
}

export default Diary;