import { render, screen } from "@testing-library/react";
import MultipleDoughnutChart from "../MultipleDoughnutChart";

describe("MultipleDoughnutChart component rendered correctly", () => {
    test("chart rendered correctly", () => {
        render(<MultipleDoughnutChart nutriData={{
            carbos_percents: 0,
            fats_percents: 0,
            proteins_percents: 0,
            energy_goal: 0,
            energy_unit: "",
            energy: 0
        }}/>);
        const chartElmnt = screen.getByRole("img");
        expect(chartElmnt).toBeInTheDocument();
    });

    test("Energy count rendered correctly", () => {
        render(<MultipleDoughnutChart nutriData={{
            carbos_percents: 0,
            fats_percents: 0,
            proteins_percents: 0,
            energy_goal: 0,
            energy_unit: "",
            energy: 100
        }}/>);

        const countElmnt = screen.getByText("100");
        expect(countElmnt).toBeInTheDocument();
    })
})