import {useState } from "react";
import _defaultProductImg from "../../assets/sliders/s_2.webp";
import SetQuantity from "./SetQuantity";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import formatPrice from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  price,
  discount,
  specialPrice,
  quantity,
  cartId,
}) => {
  console.log("PRO:" + productId);
  const cartFromRedux = useSelector((state) =>
    state.carts.cart.find((item) => item.productId === productId),
  );

  const [currentQuantity, setCurrentQuantity] = useState(
    cartFromRedux?.quantity || quantity,
  );
  const dispatch = useDispatch();
  console.log(specialPrice);
  

  const buildCartItem = (qty) => ({
    productId,
    productName,
    image,
    description,
    price: Number(price),
    discount: Number(discount),
    specialPrice: Number(specialPrice),
    quantity: Number(qty),
    cartId,
  });

  const handleQtyIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    dispatch(increaseCartQuantity(buildCartItem(newQuantity), newQuantity));
  };

  const handleQtyDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(buildCartItem(newQuantity), newQuantity));
    }
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart(buildCartItem(currentQuantity), toast));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-400 my-2 bg-slate-100 rounded-lg">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start p-3">
          <h3 className="lg:text-[17px] text-lg font-semibold text-slate-800">
            {truncateText(productName)}
          </h3>
        </div>

        <div className="md:w-36 sm:w-24 w-12 ">
          <img
            src={_defaultProductImg}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded md "
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() => {
                console.log(productId);
                removeItemFromCart();
              }}
              className="flex items-center font-semibold space-x-2 mx-3 mb-3 px-4 py-2 text-xs text-white rounded-md bg-rose-600 hover:bg-red-400 transition-colors duration-300"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold ">
        {formatPrice(Number(specialPrice).toFixed(2))}
      </div>
      <div className="justify-self-center">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold ">
        {formatPrice((Number(currentQuantity) * Number(specialPrice)).toFixed(2))} </div>
    </div>
  );
};

export default ItemContent;
