import { render, screen, fireEvent } from "@testing-library/react";
import CalendarTile from "../../tiles/CalendarTile";

describe("CalendarTile component rendered correctly", () => {


  beforeAll(() => {
    jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-02'));
  })

  afterAll(() => {
  });


  test("renders the date correctly", () => {
    const date = new Date("2020-2-20");
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Thu Feb 20, 2020");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for today", () => {
    const date = new Date('2020-01-02');
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Today");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for yesterday", () => {
    const date = new Date('2020-01-01');
    render(<CalendarTile date={date} nextHandler={() => {}} prevHandler={() => {}} />);
    const dateElement = screen.getByText("Yesterday");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the date correctly for tomorrow", () => {
    const date = new Date('2020-01-03');
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