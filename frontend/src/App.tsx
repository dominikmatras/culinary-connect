import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import AppLayout from "./components/ui/AppLayout/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute/ProtectedRoute";
import Tables from "./pages/Tables/Tables";
import Settings from "./pages/Settings/Settings";
import Orders from "./pages/Orders/Orders";
import OrderProvider from "./context/OrderContext";
import NotFound from "./pages/NotFound/NotFound";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signup from "./pages/Signup/Signup";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <OrderProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/menu" element={<Menu />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
              <Route index element={<Navigate replace to='/login'/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </OrderProvider>
    </>
  );
}

export default App;
