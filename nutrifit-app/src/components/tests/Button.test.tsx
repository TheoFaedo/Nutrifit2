import { render, screen } from "@testing-library/react";
import Button from "../Button"

describe("Button component rendered correctly", () => {
    test("button not inverted rendering", () => {
        render(<Button name="A button name"/>);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});

        expect(inputElmnt).toHaveClass("button");
        expect(inputElmnt).not.toHaveClass("button-inverted");
        expect(inputElmnt).toHaveProperty("type", "button");
    });

    test("submit button not inverted rendering", () => {
        render(<Button name="A button name" submit/>);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});

        expect(inputElmnt).toHaveClass("button");
        expect(inputElmnt).not.toHaveClass("button-inverted");
        expect(inputElmnt).toHaveProperty("type", "submit");
    });

    test("button inverted rendering", () => {
        render(<Button name="A button name" inverted/>);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});

        expect(inputElmnt).toHaveClass("button-inverted");
        expect(inputElmnt).not.toHaveClass("button");
        expect(inputElmnt).toHaveProperty("type", "button");
    })

    test("submit button inverted rendering", () => {
        render(<Button name="A button name" inverted submit/>);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});

        expect(inputElmnt).toHaveClass("button-inverted");
        expect(inputElmnt).not.toHaveClass("button");
        expect(inputElmnt).toHaveProperty("type", "submit");
    })
}) 

describe("Button component interact correctly", () => {
    test("button handler executed on click", () => {
        const handler = jest.fn();

        render(<Button name="A button name" onClick={handler} />);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});
        
        inputElmnt.click();

        expect(handler).toHaveBeenCalledTimes(1);
    });

    test("button handler executed 2 times after 2 clicks", () => {
        const handler = jest.fn();

        render(<Button name="A button name" onClick={handler} />);
        const inputElmnt = screen.getByRole("button", {name: "A button name"});
        
        inputElmnt.click();
        inputElmnt.click();

        expect(handler).toHaveBeenCalledTimes(2);
    });
});