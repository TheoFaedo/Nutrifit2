import i18next from "i18next";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import ArrowSVG from "../../svg/ArrowSVG";

type Props = {
  date: Date;
  prevHandler: () => void;
  nextHandler: () => void;
}

const formatDate = (
  date: Date,
  todayLabel: string,
  yesterdayLabel: string,
  tomorowLabel: string,
  langage: string
) => {
  if (date.toDateString() === new Date().toDateString()) {
    return todayLabel;
  } else if (
    date.toDateString() ===
    new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
  ) {
    return yesterdayLabel;
  } else if (
    date.toDateString() ===
    new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
  ) {
    return tomorowLabel;
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat(langage, options).format(date);

  // Extract the first three letters of each part of the date
  const [weekday, day, month, year] = formattedDate.split(" ");
  const formattedString = `${weekday.slice(0, 3)} ${day} ${month.slice(
    0,
    3
  )} ${year}`;

  return formattedString;
};

const CalendarTile: FunctionComponent<Props> = ({date, prevHandler, nextHandler}) => {
  const { t } = useTranslation("translation", { keyPrefix: "DiaryPage" });

  return (
    <div className="calendar_tile">
      <button
        className="rounded-full text-2xl gradient-bg font-medium mx-4 w-8 h-8 flex items-center justify-center"
        onClick={prevHandler}
      >
        <ArrowSVG inverted/>
      </button>
      <div className="text-base font-medium w-40">
        {formatDate(
          date,
          t("Today"),
          t("Yesterday"),
          t("Tomorrow"),
          i18next.language === "fr" ? "fr-FR" : "en-US"
        )}
      </div>
      <button
        className="rounded-full text-2xl gradient-bg font-medium mx-4 w-8 h-8 flex items-center justify-center"
        onClick={nextHandler}
      >
        <ArrowSVG/>
      </button>
    </div>
  );
};

export default CalendarTile;
