import { render, screen } from "@testing-library/react";
import LeftArrowButton from "../LeftArrowButton";

describe("LeftArrowButton component rendered correctly", () => {
    test("left arrow button not inverted rendering", () => {
        render(<LeftArrowButton quitDialog={() => {}}/>);
        const buttonElmnt = screen.getByRole("button");
        expect(buttonElmnt).toHaveClass("left_arrow_button");
    })
})

describe("LeftArrowButton component interact correctly", () => {
    test("quitDialog handler executed on click", () => {
        const handler = jest.fn();

        render(<LeftArrowButton quitDialog={handler}/>);
        const buttonElmnt = screen.getByRole("button");
        
        buttonElmnt.click();

        expect(handler).toHaveBeenCalledTimes(1);
    });

    test("quitDialog handler executed 2 times after 2 clicks", () => {
        const handler = jest.fn();

        render(<LeftArrowButton quitDialog={handler}/>);
        const buttonElmnt = screen.getByRole("button");
        
        buttonElmnt.click();
        buttonElmnt.click();

        expect(handler).toHaveBeenCalledTimes(2);
    });
});