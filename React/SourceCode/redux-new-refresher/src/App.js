import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useEffect } from "react";

import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Pending",
    //       title: "Sending Request....",
    //       message: "Sending Cart data",
    //     }),
    //   );

    //   const response = await fetch(
    //     "https://react-redux-85191-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "Put",
    //       body: JSON.stringify(cart),
    //     },
    //   );

    //   if (!response.ok) {
    //     throw Error("Sending Cart Data Failed");
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       status: "success",
    //       title: "Success!!",
    //       message: "Sending Cart data Successfully",
    //     }),
    //   );
    //   //const responseData = await response.json();
    // };
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }
    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!!",
    //       message: "Sending Cart data Failed",
    //     }),
    //   );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />} <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
