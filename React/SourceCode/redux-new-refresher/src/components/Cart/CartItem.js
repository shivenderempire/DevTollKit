import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, total, price, id, description } = props.item;
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItemsToCart(id));
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemsToCart({
        title,
        price,
        description,
        id,
        quantity: 1,
      }),
    );
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => removeItemHandler(id)}>-</button>
          <button onClick={() => addItemHandler()}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
