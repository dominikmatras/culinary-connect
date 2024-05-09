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
            </Route>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div>
                  <p>Page Not Found!</p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
