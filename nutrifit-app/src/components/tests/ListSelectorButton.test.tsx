import { render, screen } from "@testing-library/react";
import ListSelectorButton from "../ListSelectorButton";


describe("ListSelectorButton component rendered correctly", () => {
    test("buttons rendered correctly with active 0", () => {
        render(<ListSelectorButton names={["categ1", "categ2"]} active={0}/>);
        const button1Elmnt = screen.getByRole("button", {name: "categ1"});
        const button2Elmnt = screen.getByRole("button", {name: "categ2"});
        expect(button1Elmnt).toBeInTheDocument();
        expect(button2Elmnt).toBeInTheDocument();

        expect(button1Elmnt).toHaveClass("border-b-4");
        expect(button2Elmnt).not.toHaveClass("border-b-4");
    })

    test("buttons rendered correctly with active 1", () => {
        render(<ListSelectorButton names={["categ1", "categ2"]} active={1}/>);
        const button1Elmnt = screen.getByRole("button", {name: "categ1"});
        const button2Elmnt = screen.getByRole("button", {name: "categ2"});
        expect(button1Elmnt).toBeInTheDocument();
        expect(button2Elmnt).toBeInTheDocument();

        expect(button1Elmnt).not.toHaveClass("border-b-4");
        expect(button2Elmnt).toHaveClass("border-b-4");
    })

    test("buttons rendered correctly with multiple names", () => {
        render(<ListSelectorButton names={["categ1", "categ2", "categ3", "categ4"]} active={0}/>);
        const button1Elmnt = screen.getByRole("button", {name: "categ1"});
        const button2Elmnt = screen.getByRole("button", {name: "categ2"});
        const button3Elmnt = screen.getByRole("button", {name: "categ3"});
        const button4Elmnt = screen.getByRole("button", {name: "categ4"});
        expect(button1Elmnt).toBeInTheDocument();
        expect(button2Elmnt).toBeInTheDocument();
        expect(button3Elmnt).toBeInTheDocument();
        expect(button4Elmnt).toBeInTheDocument();

        expect(button1Elmnt).toHaveClass("border-b-4");
        expect(button2Elmnt).not.toHaveClass("border-b-4");
        expect(button3Elmnt).not.toHaveClass("border-b-4");
        expect(button4Elmnt).not.toHaveClass("border-b-4");
    })

    test("buttons rendered correctly with active number too high", () => {
        render(<ListSelectorButton names={["categ1", "categ2"]} active={2}/>);
        const button1Elmnt = screen.getByRole("button", {name: "categ1"});
        const button2Elmnt = screen.getByRole("button", {name: "categ2"});

        expect(button1Elmnt).toBeInTheDocument();
        expect(button2Elmnt).toBeInTheDocument();

        expect(button1Elmnt).toHaveClass("border-b-4");
        expect(button2Elmnt).not.toHaveClass("border-b-4");
    })
}) 

describe("ListSelectorButton component interact correctly", () => {

    test("onClick handler is called on a button click", () => {
        const handler = jest.fn();

        render(<ListSelectorButton names={["categ1", "categ2"]} active={0} onClick={handler}/>);
        
        const button1Elmnt = screen.getByRole("button", {name: "categ1"});
        const button2Elmnt = screen.getByRole("button", {name: "categ2"});
        
        button1Elmnt.click();
        expect(handler).toHaveBeenCalledTimes(1);

        button2Elmnt.click();
        expect(handler).toHaveBeenCalledTimes(2);

        button2Elmnt.click();
        expect(handler).toHaveBeenCalledTimes(3)
    })
});