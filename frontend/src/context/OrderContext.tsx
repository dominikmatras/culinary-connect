import { createContext, useContext, useState } from "react";

type OrderProviderType = {
  children: React.ReactNode;
};

type OrderContextType = {
  showOrderBar: boolean;
  setShowOrderBar: (showOrderBar: boolean) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

const OrderProvider = ({ children }: OrderProviderType) => {
  const [showOrderBar, setShowOrderBar] = useState(false);
  const value = {
    showOrderBar,
    setShowOrderBar,
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
