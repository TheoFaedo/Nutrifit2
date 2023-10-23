import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header component rendering", () => {
    test("h1 is rendered", () => {
        render(<Header/>);
        const h1Elmt = screen.getByRole("heading", {name: /nutrifit/i, level: 1})
        expect(h1Elmt).toBeInTheDocument();
    })

    test("whitehat svg is rendered", () => {
        render(<Header/>);
        const svgElmt = screen.getByRole("img")
        expect(svgElmt).toBeInTheDocument();
    })
});