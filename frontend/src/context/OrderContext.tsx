import { createContext, useContext, useReducer, useState } from "react";
import { Table } from "../pages/Tables/Tables";

type OrderProviderType = {
  children: React.ReactNode;
};

type OrderContextType = {
  showOrderBar: boolean;
  table: Table;
  startOrder: boolean;
  mealsToOrder: any[];
  dispatch: any;
};

const OrderContext = createContext<OrderContextType | null>(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SHOW_ORDER_BAR":
      return { ...state, showOrderBar: action.payload };
    case "SET_TABLE":
      return { ...state, table: action.payload };
    case "START_ORDER":
      return { ...state, startOrder: action.payload };
    case "ADD_MEAL_TO_ORDER":
      return { ...state, mealsToOrder: [...state.mealsToOrder, action.payload] };
    default:
      return state;
  }
}

const OrderProvider = ({ children }: OrderProviderType) => {
  const [{ table, showOrderBar, startOrder, mealsToOrder }, dispatch] = useReducer(reducer, {
    table: {
      id: 0,
      tableNumber: 0,
      status: "",
    },
    showOrderBar: false,
    startOrder: false,
    mealsToOrder: [],
  });

  const value = {
    showOrderBar,
    table,
    startOrder,
    mealsToOrder,
    dispatch
  };
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }

  return context;
};

export default OrderProvider;
