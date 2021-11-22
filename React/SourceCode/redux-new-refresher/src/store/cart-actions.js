import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-redux-85191-default-rtdb.firebaseio.com/cart.json",
            );
            if (!response.ok) {
                throw new Error("Error while fetching Data");
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();

            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                }),
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!!",
                    message: "Fetching Cart data Failed",
                }),
            );
        }
    };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending Request....",
        message: "Sending Cart data",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-85191-default-rtdb.firebaseio.com/cart.json",
        {
          method: "Put",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        },
      );

      if (!response.ok) {
        throw Error("Sending Cart Data Failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sending Cart data Successfully",
        }),
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Sending Cart data Failed",
        }),
      );
    }
  };
};
