import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/Auth";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import { ErrorPage } from "./pages/Error";
import { Home } from "./pages/Home/index";
import { Login } from "./pages/Login";
import { Notifications } from "./pages/Notifications";

import { RequireAuth } from "./context/Auth/RequireAuth";


export function App() {

  return (
    <BrowserRouter >
      <ThemeProvider theme={defaultTheme}>
        <ConfigProvider locale={ptBR}>
          <GlobalStyle />
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/home" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>}>
              </Route>
              <Route path="/notifications" element={<Notifications />}></Route>
              <Route path="/error" element={<ErrorPage/>}></Route>
            </Routes>
          </AuthProvider>
        </ConfigProvider>

      </ThemeProvider>
    </BrowserRouter>
  );
}
