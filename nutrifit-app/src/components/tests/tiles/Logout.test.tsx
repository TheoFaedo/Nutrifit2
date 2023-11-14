import LogoutTile from "../../tiles/LogoutTile"
import { BrowserRouter } from "react-router-dom";
import { useAuth } from '../../../hooks/useAuth';
import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";

jest.mock('../../../hooks/useAccount', () => ({
    useAccount: () => {
        return {
            account:{
                username: "test",
                mail: "test",
                token: "testtoken",
                gender: "M"
            }
        }
    }
}));

const mockLogoutFn = jest.fn()
jest.mock('../../../hooks/useAuth', () => {
    return {
        useAuth: () => {
            return {
                logout: mockLogoutFn
            }
        }
    }
})


describe("LogoutTile component rendered correctly", () => {
    test("Message rendered correctly", async () => {
        render(<LogoutTile/>, { wrapper: BrowserRouter });
        const outputElement = await screen.findByRole("status");

        expect(outputElement).toBeInTheDocument();
        expect(outputElement).toHaveTextContent("You are logged as test");
    });

    test("Logout button rendered correctly", async () => {
        render(<LogoutTile/>, { wrapper: BrowserRouter });
        const outputElement = await screen.findByRole("button", {name: /Logout/i});

        expect(outputElement).toBeInTheDocument();
    });
});

describe("LogoutTile component interract correctly", () => {
    test("Logout button clicked correctly", async () => {

        render(<LogoutTile/>, { wrapper: BrowserRouter });

        const outputElement = await screen.findByRole("button", {name: /Logout/i});
        expect(outputElement).toBeInTheDocument();

        userEvent.click(outputElement);

        expect(mockLogoutFn).toHaveBeenCalled();
    })
})