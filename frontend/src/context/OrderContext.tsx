import { createContext, useContext, useReducer } from "react";
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
      if (state.mealsToOrder.some((meal: any) => meal.id === action.payload.id)) {
        return {
          ...state,
          mealsToOrder: state.mealsToOrder.map((meal: any) =>
            meal.id === action.payload.id
              ? { ...meal, quantity: meal.quantity + 1 }
              : meal
          ),
        };
      }
      return { ...state, mealsToOrder: [...state.mealsToOrder, action.payload] };
    case "REMOVE_MEAL_FROM_ORDER":
      const meal = state.mealsToOrder.find((meal: any) => meal.id === action.payload.id);

      if (meal.quantity === 1) {
        return {
          ...state,
          mealsToOrder: state.mealsToOrder.filter(
            (meal: any) => meal.id !== action.payload.id
          ),
        };
      }
      return {
        ...state,
        mealsToOrder: state.mealsToOrder.map((meal: any) =>
          meal.id === action.payload.id
            ? { ...meal, quantity: meal.quantity - 1 }
            : meal
        ),
      };
    case "CLEAR_ORDER":
      return { ...state, mealsToOrder: [], startOrder: false, showOrderBar: false };
    default:
      return state;
  }
};

const OrderProvider = ({ children }: OrderProviderType) => {
  const [{ table, showOrderBar, startOrder, mealsToOrder }, dispatch] = useReducer(
    reducer,
    {
      table: {
        id: 0,
        tableNumber: 0,
        status: "",
      },
      showOrderBar: false,
      startOrder: false,
      mealsToOrder: [],
    }
  );

  const value = {
    showOrderBar,
    table,
    startOrder,
    mealsToOrder,
    dispatch,
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
