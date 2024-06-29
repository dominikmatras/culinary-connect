import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster />
        <OrderProvider>
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
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
