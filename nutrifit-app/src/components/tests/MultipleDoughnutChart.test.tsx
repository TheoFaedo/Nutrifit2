import { render, screen } from "@testing-library/react";
import MultipleDoughnutChart from "../MultipleDoughnutChart";

//Disable Doughtnut from Charjs because it don't work with jest
//and we don't need it for testing
jest.mock("react-chartjs-2", () => ({
    Doughnut: jest.fn().mockReturnValue(() => {
        return <></>
    })
}));


describe("MultipleDoughnutChart component rendered correctly", () => {

    test("Energy count rendered correctly", () => {
                    
        render(<MultipleDoughnutChart nutriData={{
            carbos_percents: 30,
            fats_percents: 20,
            proteins_percents: 10,
            energy_unit: "",
            energy: 100
        }}/>);

        expect(screen.getByText("100")).toBeInTheDocument();
    })
});