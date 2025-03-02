import { FunctionComponent, useState } from "react";
import CalendarTile from "../components/tiles/CalendarTile";
import DiaryTile from "../components/tiles/DiaryTile";
import TrackingTile from "../components/tiles/TrackingTile";
import Consumption from "../models/Consumption";

const Diary: FunctionComponent = () => {

    const [date, setDate] = useState(new Date());
    const [consumptionList, setconsumptionList] = useState<Consumption[]>([]);
    const [canConfirmGoal, setCanConfirmGoal] = useState(false);
    const [locked, setLocked] = useState(false);

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

    return (
        <>
            <CalendarTile date={date} prevHandler={() => {prevHandler()}} nextHandler={() => {nextHandler()}} />
            <TrackingTile consumptionList={consumptionList} date={date} setCanConfirmGoal={setCanConfirmGoal} canConfirmGoal={canConfirmGoal} setLocked={setLocked}/>
            <DiaryTile date={date} setConsumptionList={setconsumptionList} consumptionList={consumptionList} setCanConfirmGoal={setCanConfirmGoal} locked={locked} setLocked={setLocked}/>
        </>
    );
}

export default Diary;