import { render, screen, fireEvent } from "@testing-library/react";
import CalendarTile from "./../../tiles/CalendarTile";

describe("CalendarTile component rendered correctly", () => {
  test("renders the date correctly", () => {
    const date = new Date("2022-02-15");
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Tue Feb 15, 2022");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for today", () => {
    const date = new Date();
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Today");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for yesterday", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Yesterday");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for tomorrow", () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Tomorrow");
    expect(dateElement).toBeInTheDocument();
  });
});

describe("CalendarTile component interact correctly", () => {
    test("calls the nextHandler function when next button is clicked", () => {
        const nextHandler = jest.fn();
        render(<CalendarTile date={new Date()} nextHandler={nextHandler} prevHandler={() => {}} />);
        const nextButton = screen.getByText(">");
        fireEvent.click(nextButton);
        expect(nextHandler).toHaveBeenCalledTimes(1);
      });
    
      test("calls the prevHandler function when previous button is clicked", () => {
        const prevHandler = jest.fn();
        render(<CalendarTile date={new Date()} nextHandler={() => {}} prevHandler={prevHandler} />);
        const prevButton = screen.getByText("<");
        fireEvent.click(prevButton);
        expect(prevHandler).toHaveBeenCalledTimes(1);
      });
})