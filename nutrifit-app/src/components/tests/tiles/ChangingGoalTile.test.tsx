/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import ChangingGoalTile from "../../tiles/ChangingGoalTile";
import { ToastContextProvider } from "../../../context/ToastContext";
import * as apiService from "../../../services/api-service";


//Mocks
//Disable Doughtnut from Charjs because it don't work with jest
//and we don't need it for testing
jest.mock("react-chartjs-2", () => ({
    Doughnut: jest.fn().mockReturnValue(() => {
        return <></>
    })
}));

beforeEach(() => {
    const spy = jest.spyOn(apiService, "changenutritionalgoal");
    spy.mockReturnValue(new Promise((resolve) => {
        resolve({
            success: true
        })
    }));
    const spyGetNutritionalGoal = jest.spyOn(apiService, "getnutritionalgoal");
    spyGetNutritionalGoal.mockReturnValue(new Promise((resolve) => {
        resolve({
            idUser: 1,
            energy_goal: 340,
            carbohydrates_goal: 30,
            fats_goal: 20,
            proteins_goal: 10
        })
    }))
});

describe("ChangingGoalTile component rendering testing", () => {
    test("Button rendered correctly", async () => {
            await act( async () => render(<ChangingGoalTile/>));

            const buttonElmnt = screen.getByRole("button", {name: "Save"});
            expect(buttonElmnt).toBeInTheDocument();
    })

    test("Inputs rendered correctly", async () => {
            await act( async () => render(<ChangingGoalTile/>));

            const energyElmnt = await screen.findByRole("spinbutton", {name: "energy"});
            expect(energyElmnt).toBeInTheDocument();
            expect(energyElmnt).toHaveValue(340);

            const carbosElmnt = await screen.findByRole("spinbutton", {name: "carbos"});
            expect(carbosElmnt).toBeInTheDocument();
            expect(carbosElmnt).toHaveValue(30);

            const fatsElmnt = await screen.findByRole("spinbutton", {name: "fats"});
            expect(fatsElmnt).toBeInTheDocument();
            expect(fatsElmnt).toHaveValue(20);

            const proteinsElmnt = await screen.findByRole("spinbutton", {name: "proteins"});
            expect(proteinsElmnt).toBeInTheDocument();
            expect(proteinsElmnt).toHaveValue(10);
    })
});

describe("ChangingGoalTile component functionality testing", () => {

    test("Button clicked and successful", async () => {
        await act( async () => render(<ToastContextProvider><ChangingGoalTile/></ToastContextProvider>));

        const buttonElmnt = screen.getByRole("button", {name: "Save"});

        buttonElmnt.click();

        expect(buttonElmnt).toBeEnabled();

        const toastConfirm = await screen.findByText("Goal changed successfully");
        expect(toastConfirm).toBeInTheDocument();
    });

    test("Button clicked and unsuccessful", async () => {
        const spy = jest.spyOn(apiService, "changenutritionalgoal");
        spy.mockReturnValue(new Promise((resolve) => {
            resolve({
                success: false
            })
        }));

        await act( async () => render(<ToastContextProvider><ChangingGoalTile/></ToastContextProvider>));

        const buttonElmnt = screen.getByRole("button", {name: "Save"});

        buttonElmnt.click();

        expect(buttonElmnt).toBeEnabled();

        const toastConfirm = await screen.findByText("Failed to change goal");
        expect(toastConfirm).toBeInTheDocument();
    });
});