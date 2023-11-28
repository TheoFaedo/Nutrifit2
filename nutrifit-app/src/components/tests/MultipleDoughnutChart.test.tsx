import { render, screen } from "@testing-library/react";
import MultipleDoughnutChart from "../MultipleDoughnutChart";
import { EnergyInKcal } from "../../models/valueObjects/Energy";

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
            carbos: EnergyInKcal.create(30),
            fats: EnergyInKcal.create(20),
            proteins: EnergyInKcal.create(10),
            energy_unit: "",
            energy: EnergyInKcal.create(100)
        }}/>);

        expect(screen.getByText("100")).toBeInTheDocument();
    })
});