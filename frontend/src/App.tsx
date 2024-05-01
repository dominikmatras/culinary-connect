import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MealsList from "./components/MealsList/MealsList";
import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [searchedValue, setSearchValue] = useState("");

  const onChangeSearch = (value: string) => {
    setSearchValue(value)
  }
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <div style={{
          width: '100%',
          display: 'flex',
          }}>

    <Navbar/>
        <div style={{
          flexGrow: 1,
          flexShrink: 0,
        }}>
        <Searchbar onChange={onChangeSearch} value={searchedValue}/>
        <MealsList searchedValue={searchedValue}/>
        </div>
        </div>
        {/* <Login/> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
