import { useEffect, useState } from "react";
import KitchenOrder from "../../components/ui/KitchenOrder/KitchenOrder";
import OrdersTopbar from "../../components/ui/OrdersTopBar/OrdersTopbar";
import Spinner from "../../components/ui/Spinner/Spinner";
import { useOrders } from "../../hooks/Orders/useOrders";
import "./Orders.less";

export type Order = {
  id: string;
  meals: { meal: number; quantity: number; _id: string; mealName: string }[];
  status: string;
  tableNumber: number;
  createdAt: string;
};

const Orders = () => {
  const { orders, isLoading } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setFilteredOrders(orders);
    setFilter("all");
  }, [isLoading, orders]);

  const chooseFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "all") {
      setFilteredOrders(orders);
      return;
    }
    setFilteredOrders(orders.filter((order: Order) => order.status === filter));
  };

  return !isLoading ? (
    <>
      <OrdersTopbar chooseFilter={chooseFilter} filter={filter} orders={orders}/>
      <div className="orders">
        {filteredOrders?.map((order: Order) => {
          return <KitchenOrder key={order.id} order={order} />;
        })}
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Orders;
