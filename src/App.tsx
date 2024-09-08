import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardsPage from "src/pages/Borad/BoradsPage.tsx";

import { DataProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignPage from "./pages/SignUp/SignupPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/register" element={<SignPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </DataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
export default App;
