import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"

const AllTheProviders = ({ children }) => {
    return (
      <BrowserRouter>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </BrowserRouter>
    )
}

const renderAllProviders = (ui, options) => {
    return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from "@testing-library/react";
export {
    renderAllProviders as render,
}
